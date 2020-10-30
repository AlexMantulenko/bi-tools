import React, { useState, useEffect } from 'react';
import Select from 'react-select'

import BarSrc from '../images/bar-plot.png';
import LineSrc from '../images/line-plot.png';
import ScatterSrc from '../images/scatter-plot.png';
import AreaSrc from '../images/area-plot.png';

import customStyles from './styles/customStyles';

import Chart from '../components/Chart'; 

import './styles/DataVisual.css';


const DataVisual = ({ data }) => {
  const [showCharts, setShowCharts] = useState('none');
  const [hoveredChart, setHoveredChart] = useState('...');
  const [selectedChart, setSelectedChart] = useState(null);

  const [title, setTitle] = useState('');

  const handleTitle = e => {
    setTitle(e.target.value);
  }


  const colourStyles = {
    control: (provided, state) => ({
      ...provided, 
      backgroundColor: 'white' ,
      minHeight: '28px',
      height: '28px',
      minWidth: '170px',
      fontSize: '12px',
      boxShadow: state.isFocused ? null : null,
    }),
    
    menu: (provided, state) => ({
      ...provided,
      minHeight: '70px',
      maxWidth: '170px',
      fontSize: '12px'
    }),
    multiValue: (styles, { data }) => ({
      ...styles,
      fontSize: '12px'
    }),
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),

    // ***********
    valueContainer: (provided, state) => ({
      ...provided,
      height: '24px',
      padding: '0 6px'
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '24px',
    }),
  };





  const charts = [
    { id: 1, name: 'bar', icon: BarSrc },
    { id: 2, name: 'scatter', icon: ScatterSrc },
    { id: 3, name: 'line', icon: LineSrc },
    { id: 4, name: 'area', icon: AreaSrc }
  ];

  const [chartConfig, setChartConfig] = useState({
    dataColumn: [],
    dataRows: []
  });

  const [options, setOptions] = useState({
    columnOptions: [],
    rowOptions: []
  })

  useEffect(() => {
    let header = Object.keys(data[0]);
    const options = [];
    header.forEach(item => {
        options.push({ value: item, label: item });
    });
    setOptions({
      columnOptions: [...options],
      rowOptions: [...options]
    });
  }, []);


  const saveAsImage = () => {
    if(!selectedChart) {
      alert('Nothing to download!')
    }
    else {
      alert('Saving...')
    }
  }

  return (
    <div className="data-visual">
      <div className="file-analyze">
          
          <div className="param">
              <p>...</p>
              <div>{}</div>
          </div>

          <div className="param">
              <p>...</p>
              <div>{}</div>
          </div>

          <div className="param">
              <p>...</p>
              <div>{}</div>
          </div>
      </div>

      <div className="csv-data-visual">
          <div className="tools">
            <button 
              className="save-as-img"
              onClick={saveAsImage}
            >
              <span class="material-icons">perm_media</span>
              Save as image
            </button>
            <div className="toggle">
              <button onClick={() => {
                if(showCharts === 'none') {
                  setShowCharts('block');
                }
                else {
                  setShowCharts('none');
                }
              }}>
                <span className="material-icons">
                  stacked_line_chart
                </span>
                Charts            
              </button>
              <ul style={{display: showCharts }}>
                {charts.map((item, i) => {
                  return (
                    <li 
                      key={item.id}
                      onClick={() => {
                        if(i === item.id - 1) {
                          setTitle('')
                          if(chartConfig.dataColumn.length !== 0 && chartConfig.dataRows.length !== 0) {
                            setSelectedChart(item);
                            setShowCharts('none');
                          }
                          else {
                            alert("Firstly select rows and columns!") 
                          }

                        }
                      }}
                      onMouseOver={() => {
                        if(i === item.id - 1) {
                          setHoveredChart(item.name);
                        }
                      }}
                      onMouseOut={() => setHoveredChart('')}
                    >
                      <img src={item.icon} width="120" height="80" alt="chart-image" />               
                    </li>
                  );
                })}
                <div>
                  <p>Chart: {hoveredChart}</p>    
                </div>
              </ul>
            </div>
          </div>
          
          <div className="cols-rows-config">
            <div className="cols">
              <div className="col">
                <p>Columns</p>
              </div> 
              <Select 
                options={options.columnOptions} 
                styles={customStyles} 
                onChange={opt => { 
                  setChartConfig({ ...chartConfig, dataColumn: opt.value });
                }}
              />
            </div>

            <div className="rows">
              <div className="row">
                <p>Rows</p>  
              </div> 
              <Select
                isMulti
                name="rows"
                options={options.rowOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={colourStyles}
                onChange={opt => { 

                  if(opt === null || opt.length === 0) {
                    setSelectedChart(null);
                    setChartConfig({
                      ...chartConfig,
                      dataRows: []
                    })
                  }
                  else {
                    const values = [];
                    opt.forEach(item => {
                      values.push(item.value);
                    });
                    setChartConfig({ ...chartConfig, dataRows: [...values] });
                  }
                  
                }}
              />
            </div>
          </div>

          <div className="chart">

              { selectedChart ? 
              
              <div className="chart-area">
                <input 
                  type="text" 
                  value={title} 
                  onChange={handleTitle}
                />
                <Chart 
                  data={data} 
                  chartInfo={selectedChart} 
                  dataColumn={chartConfig.dataColumn} 
                  dataRows={chartConfig.dataRows}
                />
              </div>

              : <p className="message">Please select rows and columns, then chart</p> } 
          </div>

      </div>
                
    </div>
  );
}

export default DataVisual;
