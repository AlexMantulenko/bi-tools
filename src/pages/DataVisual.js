import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select'

import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChromePicker } from 'react-color'

import BarSrc from '../images/bar-plot.png';
import LineSrc from '../images/line-plot.png';
import AreaSrc from '../images/area-plot.png';

import customStyles from './styles/customStyles';
import Chart from '../components/Chart'; 
import './styles/DataVisual.css';

const DataVisual = ({ data }) => {
  const [showCharts, setShowCharts] = useState('none');
  const [hoveredChart, setHoveredChart] = useState('...');
  const [selectedChart, setSelectedChart] = useState(null);

  // Title config
  const [title, setTitle] = useState('');
  const [titleColorPicker, setTitleColorPicker] = useState({  
    show: false,
    color: { r: '0', g: '0', b: '0', a: '1' }
  });
  const [titleSize, setTitleSize] = useState(26);
  const [titleAlign, setTitleAlign] = useState("left");
  const handleTitle = e => setTitle(e.target.value);


  const [openPanel, setOpenPanel] = useState({
    position: -225,
    isOpen: false
  });

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
    { id: 2, name: 'line', icon: LineSrc },
    { id: 3, name: 'area', icon: AreaSrc }
  ];

  const [chartConfig, setChartConfig] = useState({
    dataColumn: [],
    dataRows: []
  });

  const [options, setOptions] = useState({
    columnOptions: [],
    rowOptions: []
  });

  const [chartScale, setChartScale] = useState(1);

  const initOptions = () => {
    let header = Object.keys(data[0]);
    const options = [];
    header.forEach(item => {
        options.push({ value: item, label: item });
    });
    setOptions({
      columnOptions: [...options],
      rowOptions: [...options]
    });
  }

  useEffect(initOptions, [data]);

  const chartNode = useRef(null);



  const saveAsImage = () => {
    const styles = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
    if(!selectedChart) {
      toast.info("Nothing to download!", styles);
    }
    else {
      toast.success("Downloading...", styles);
      let node = chartNode.current;
      toPng(node).then(dataUrl => download(dataUrl, 'my-node.png'));
    }
  }

   
  

  const selectTitleColor = () => {
    setTitleColorPicker({ 
      ...titleColorPicker, 
      show: !titleColorPicker.show 
    });
  }
  const closeTitleColorPicker = () => {
    setTitleColorPicker({ 
      ...titleColorPicker, 
      show: false
    });
  }
  const changeTitleColor = color => {
    setTitleColorPicker({ 
      ...titleColorPicker, 
      color: color.rgb
    });
  }


  const popover = {
    position: 'absolute',
    zIndex: 999
  }
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }

  const { r, g, b, a } = titleColorPicker.color;

  return (
    <div className="data-visual">
      <div 
        className="styles-block" 
        style={{
          position: 'fixed',
          left: openPanel.position,
          zIndex: 900
        }}
      >
          <div className="close-styles">
            <button onClick={() => setOpenPanel({ position: -225, isOpen: false })}>
              <span class="material-icons">
                close
              </span>
            </button>
          </div>
          <div className="param">
              <p>Title color</p>
              <div className="field" onClick={selectTitleColor}>
                <div style={{ 
                  height: 10, 
                  backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
                  cursor: 'pointer' 
                }}>
                  
                </div>
              </div>

              { 
                titleColorPicker.show ? 
                <div style={popover}>
                  <div style={cover} onClick={closeTitleColorPicker}/>
                  <ChromePicker color={titleColorPicker.color} onChange={changeTitleColor} />
                </div> 
                : null 
              }
              
          </div>

          <div className="param">
              <p>Title size</p>
              <div className="field num">
                <input 
                  type="number" 
                  min="10" 
                  max="40" 
                  value={titleSize} 
                  onChange={e => { 
                    setTitleSize(e.target.value);
                  }}
                />
              </div>
          </div>

          <div className="param">
              <p>Title align</p>
              <div className="field btns">
                <button title="left" onClick={() => setTitleAlign("left")}>
                  <span className="material-icons">
                    format_align_left
                  </span>
                </button>
                <button title="center" onClick={() => setTitleAlign("center")}>
                  <span class="material-icons">
                    format_align_center
                  </span>
                </button>
                <button title="right" onClick={() => setTitleAlign("right")}>
                  <span className="material-icons">
                    format_align_right
                  </span>
                </button>
              </div>
          </div>

          <div className="param">
              <p>Chart scale</p>
              <div className="field num">
                <input 
                  type="number" 
                  min="0.6" 
                  max="1.1"
                  step="0.1" 
                  value={chartScale} 
                  onChange={e => { 
                    setChartScale(e.target.value);
                  }}
                />
              </div>
          </div>

      </div>

      <div className="csv-data-visual">
          <div className="tools">
            <button 
              className="save-as-img"
              disabled={!selectedChart}
              onClick={() => {
                if(openPanel.isOpen) {
                  setOpenPanel({ position: -225, isOpen: false });
                }
                else {
                  setOpenPanel({ position: 0, isOpen: true });
                }
              }}
            
            >
              <span class="material-icons">
                format_paint
              </span>
              Styles
            </button>
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
                            toast.warn("Firstly select rows and columns!", {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
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
                      <img src={item.icon} width="120" height="80" alt="chart-img" />               
                    </li>
                  );
                })}
                <div className="chart-name">
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
                    opt.forEach(item => values.push(item.value));
                    setChartConfig({ ...chartConfig, dataRows: [...values] });
                  }            
                }}
              />
            </div>
          </div>

          <div className="chart">

              { selectedChart ? 
              
              <div className="chart-area" ref={chartNode}>
                <input 
                  style={{ 
                    color: `rgba(${r}, ${g}, ${b}, ${a})`, 
                    fontSize: Number(titleSize),
                    textAlign: titleAlign
                  }}
                  type="text" 
                  value={title} 
                  onChange={handleTitle}
                />
                <Chart 
                  data={data} 
                  chartInfo={selectedChart} 
                  dataColumn={chartConfig.dataColumn} 
                  dataRows={chartConfig.dataRows}
                  k={chartScale}
                />
              </div>

              : <p className="message">Please select rows and columns, then chart</p> } 
          </div>

      </div>


      <ToastContainer />          
    </div>
  );
}

export default DataVisual;
