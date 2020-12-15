import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, AreaChart, Area
} from 'recharts';

const Chart = ({ chartInfo, data, dataRows, dataColumn, k }) => {
  const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);

  const getColor = i => {
    switch(i) {
      case 0: return 'rgb(48, 106, 212)';
      case 1: return 'rgb(221, 176, 28)';
      case 2: return 'rgb(223, 46, 46)';
      case 3: return 'rgb(255, 255, 0)';
      case 4: return 'rgb(0, 255, 255)';
      case 5: return 'rgb(255, 0, 255)';
      case 6: return 'rgb(68, 194, 29)';
      case 7: return 'rgb(29, 142, 194)';
      case 8: return 'rgb(194, 29, 180)';
      case 9: return 'rgb(206, 9, 85)';
      case 10: return 'rgb(219, 216, 24)';
      default: return `rgb(${rand(0, 256)}, ${rand(0, 256)}, ${rand(0, 256)})`;
    }
  }

  switch(chartInfo.name) {
    case 'line': 
      return (
        <LineChart
          width={670 * k}
          height={370 * k}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataColumn} />
          <YAxis />
          <Tooltip />
          <Legend />
          
          {dataRows.map((item, i) => {
            return <Line type="monotone" dataKey={item} stroke={getColor(i)} activeDot={{ r: 8 }} />
          })}

        </LineChart>
      );
      
    case 'bar':
      return (
        <BarChart
          width={670 * k}
          height={370 * k}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataColumn} />
          <YAxis />
          <Tooltip />
          <Legend />
          
          {dataRows.map((item, i) => {
            return <Bar dataKey={item} fill={getColor(i)} /> 
          })}
        </BarChart>
      );
    
    case 'area': 
      return (
        <AreaChart
          width={670 * k}
          height={370 * k}
          data={data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataColumn} />
          <YAxis />
          <Tooltip />
          {dataRows.map((item, i) => {
            return <Area type="monotone" dataKey={item} stroke={getColor(i)} fill={getColor(i)} />
          })}
        </AreaChart>
      );
    
    default: return <div>Error</div>
  }
}

export default Chart;