import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Scrollbar } from 'react-scrollbars-custom';
import useDataAnalyze from '../hooks/useDataAnalyze.js';
import { ToastContainer, toast } from 'react-toastify';

import customStyles from './styles/customStyles';
import './styles/DataAnalyze.css';

const DataAnalyze = ({ data }) => {
    const { max, min, mode, mean, median, quantile, std, skew, pearsonCorr } = useDataAnalyze();
    const [corrOptions, setCorrOptions] = useState({ column1: [], column2: [] });
    const [corrConfig, setCorrConfig] = useState({ x: [], y: [] });
    const [corr, setCorr] = useState("---");

    const initOptions = () => {
        let header = Object.keys(data[0]);
        const options = [];
        header.forEach(item => {
            options.push({ value: item, label: item });
        });
        setCorrOptions({
          column1: [...options],
          column2: [...options]
        });
    }
    
    useEffect(() => initOptions(), [data]);

    const renderDescription = () => {
        let header = Object.keys(data[0]), descr = [];
        for(let i = 0; i < header.length; i++) {
            let colData = [];
            for(let n = 0; n < data.length; n++) {
                colData.push(data[n][header[i]]);
            }
            let obj = {
                count: colData.length,
                min: min(colData),
                max: max(colData),
                mean: mean(colData),
                median: median(colData),
                mode: mode(colData),
                q25: quantile(colData, 0.25),
                q50: quantile(colData, 0.5),
                q75: quantile(colData, 0.75),
                std: std(colData),
                skew: skew(colData)
            }
            descr.push(obj);
        }
        return (
            <tbody>
                <tr>
                    <th></th>
                    {header.map(item => (<th>{item}</th>))}
                </tr>

                <tr>
                    <td>count</td>
                    {descr.map(item => (<td>{item.count}</td>))}
                </tr>
                <tr>
                    <td>mean</td>
                    {descr.map(item => (<td>{item.mean.toFixed(5)}</td>))}
                </tr>
                <tr>
                    <td>median</td>
                    {descr.map(item => (<td>{item.median}</td>))}
                </tr>
                <tr>
                    <td>mode</td>
                    {descr.map(item => (<td>{item.mode}</td>))}
                </tr>
                <tr>
                    <td>std</td>
                    {descr.map(item => (<td>{item.std.toFixed(5)}</td>))}
                </tr>
                <tr>
                    <td>min</td>
                    {descr.map(item => (<td>{item.min}</td>))}
                </tr>
                <tr>
                    <td>25%</td>
                    {descr.map(item => (<td>{item.q25}</td>))}
                </tr>
                <tr>
                    <td>50%</td>
                    {descr.map(item => (<td>{item.q50}</td>))}
                </tr>
                <tr>
                    <td>75%</td>
                    {descr.map(item => (<td>{item.q75}</td>))}
                </tr>
                <tr>
                    <td>max</td>
                    {descr.map(item => (<td>{item.max}</td>))}
                </tr>
                <tr>
                    <td>skew</td>
                    {descr.map(item => (<td>{item.skew.toFixed(5)}</td>))}
                </tr>
            </tbody>
        );
    }

    const renderCorrMatrix = () => {
        let matrix = [], header = Object.keys(data[0]);
  
        Object.size = obj => {
            let size = 0;
            for(let key in obj) {
                if(obj.hasOwnProperty(key)) size++;
            }
            return size;
        }

        for(let i = 0; i < Object.size(data[0]); i++) {
            matrix.push(Object.keys(data[i]).map(item => data[i][item]));
        }

        const correlations = [];
        for(let numColumn = 0; numColumn < matrix[0].length; numColumn++) {
            const rowCorrelations = [];
            for(let numColumn2 = 0; numColumn2 < matrix[0].length; numColumn2++) {
                const array1 = [], array2 = [];
                for(let i in matrix) {
                    array1.push(matrix[i][numColumn]);
                    array2.push(matrix[i][numColumn2]);
                }
                const correlationValue = pearsonCorr({ x: array1, y: array2 });

                if(!correlationValue) {
                    rowCorrelations.push("NaN");
                }
                else {
                    rowCorrelations.push(correlationValue);
                }
            }
            correlations.push(rowCorrelations);
        }
        
        return (
            <tbody>
                <tr>
                    <th></th>
                    {header.map(item => <th>{item}</th>)}
                </tr>

                {correlations.map((row, i) => {
                    return (
                        <tr>
                            <td>{header[i]}</td>
                            {row.map((col, j) => {
                                return <td key={j}>{col}</td>
                            })}
                        </tr>
                    );
                })}
            </tbody>
        );
    }

    return (
        <div className="data-analyze">
            <div className="descr">
                <p>Data description</p>
                <div className="descr-table">
                    <Scrollbar style={{ width: '100%', height: 275 }}>
                        <table id="csv-data">
                            {renderDescription()}
                        </table>
                    </Scrollbar>
                </div>
            </div>

            <div className="corr">
                <div className="value">
                    <p>Correlation of two columns:</p>
                    <Select 
                        className="sel"
                        options={corrOptions.column1} 
                        styles={customStyles} 
                        onChange={opt => {
                            let name = opt.value, colData = [];
                            data.forEach(item => colData.push(item[name]));
                            setCorrConfig({ ...corrConfig, x: colData });
                        }}
                    />
                    <Select 
                        className="sel"
                        options={corrOptions.column2} 
                        styles={customStyles} 
                        onChange={opt => {
                            let name = opt.value, colData = [];
                            data.forEach(item => colData.push(item[name]));
                            setCorrConfig({ ...corrConfig, y: colData });
                        }}
                    />
                    <button onClick={() => {
                        let value = pearsonCorr(corrConfig);
                        console.log(value);
                        if(!value) {
                            toast.warn("Type of one column is string!", {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            setCorr("---");
                        }
                        else {
                            setCorr(value);
                            // setCorr(pearsonCorr(value));
                        } 
                                    
                    }}>Count</button>
                    <h5 className="corrval">Value: {corr}</h5>
                </div>

                <div className="matrix">
                    <p>Correlation matrix</p>
                    <div>
                        <Scrollbar style={{ width: '100%', height: 200 }}>
                            <table id="csv-data">
                                {renderCorrMatrix()}
                            </table>
                        </Scrollbar>
                    </div>
                </div>
            </div>

           

            <ToastContainer />  
        </div>
    );
}

export default DataAnalyze;