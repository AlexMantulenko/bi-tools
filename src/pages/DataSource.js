import React, { useState, useEffect } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import Select from 'react-select'
import useSortableData from '../hooks/useSortableData';
import customStyles from './styles/customStyles';

import './styles/DataSource.css';


const DataSource = ({ data, fileInfo }) => {
    const [sortOptions, setSortOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const { items, requestSort, sortConfig } = useSortableData(data);

    const getClassNamesFor = name => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    useEffect(() => {
        let header = Object.keys(items[0]);
        const options = [];
        header.forEach(item => options.push({ value: item, label: item }));
        setSortOptions(options);
    }, [items]);

    const renderTableData = () => {
        return items.map((row, i) => {
            let col = Object.keys(row)
            return (
                <tr key={i}>
                {col.map((val, index) => {
                    return <td key={index}>{row[col[index]] === null ? '-' : row[col[index]]}</td>
                })}
                </tr>
            );
        });
    }
    
    const renderTableHeader = () => {
        let header = Object.keys(items[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toLowerCase()}</th>
        });
    }

    return (
        <div className="data-src">
            <div className="file-info">      
                <div className="param">
                    <p>File name</p>
                    <div className="field">{fileInfo.name}</div>
                </div>

                <div className="param">
                    <p>File size</p>
                    <div className="field">{fileInfo.size} byte</div>
                </div>

                <div className="param">
                    <p>File type</p>
                    <div className="field">{fileInfo.type}</div>
                </div>
            </div>

            <div className="csv-data">
                <div className="title">
                    <p>{fileInfo.name.substring(0, fileInfo.name.length - 4)}</p>
                </div>
                <div className="sort">
                    <div className="sort-select">
                        <p>Sort data by</p> 
                        <Select 
                            options={sortOptions} 
                            styles={customStyles} 
                            onChange={opt => { 
                                setSelectedOption(opt.value);
                                requestSort(opt.value);
                            }}
                        />
                        <p className={getClassNamesFor(selectedOption)}></p>
                    </div>
                </div>
                <div className="table">
                    <Scrollbar style={{ width: '100%', height: 330 }}>
                        <table id="csv-data">
                            <tbody>
                                <tr>{renderTableHeader()}</tr>
                                {renderTableData()}
                            </tbody>
                        </table>
                    </Scrollbar>
                </div>
            </div>             
        </div>
    );
}

export default DataSource;
