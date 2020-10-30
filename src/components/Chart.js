import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ScatterChart, Scatter, AreaChart, Area
} from 'recharts';

const Chart = ({ chartInfo, data, dataRows, dataColumn }) => {

  const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);

  const getColor = i => {
    switch(i) {
      case 0: return 'rgb(255, 0, 0)';
      case 1: return 'rgb(221, 176, 28)';
      case 2: return 'rgb(0, 0, 255)';
      case 3: return 'rgb(255, 255, 0)';
      case 4: return 'rgb(0, 255, 255)';
      case 5: return 'rgb(255, 0, 255)';
      case 6: return 'rgb(68, 194, 29)';
      case 7: return 'rgb(29, 142, 194)';
      case 8: return 'rgb(194, 29, 180)';
      case 9: return 'rgb(206, 9, 85)';
      case 10: return 'rgb(219, 216, 24)';
    }
  }

  switch(chartInfo.name) {
    case 'line': 
      return (
        <LineChart
          width={700}
          height={400}
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
          
          {dataRows.map(item => {
            return <Line type="monotone" dataKey={item} stroke={`rgb(${rand(0, 256)}, ${rand(0, 256)}, ${rand(0, 256)})`} activeDot={{ r: 8 }} />
          })}

        </LineChart>
      );
      break;

    case 'bar':
      return (
        <BarChart
          width={700}
          height={400}
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
    break;

    case 'scatter':
      return (
        <ScatterChart
          width={700}
          height={400}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey={dataColumn} name={dataColumn} />

          {dataRows.map(item => {
            return <YAxis type="number" dataKey={item} name={item} />
          })}
          
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          
          {/* {dataRows.map(item => {
            return <Scatter name={item} data={data} fill={`rgb(${rand(0, 256)}, ${rand(0, 256)}, ${rand(0, 256)})`} />
          })} */}

          <Scatter name={"name"} data={data} fill={`rgb(${rand(0, 256)}, ${rand(0, 256)}, ${rand(0, 256)})`} />
          
        </ScatterChart>
      );
    break;

    case 'area': 
      return (
        <AreaChart
          width={700}
          height={400}
          data={data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataColumn} />
          <YAxis />
          <Tooltip />
          {dataRows.map(item => {
            return <Area type="monotone" dataKey={item} stroke={`rgb(${rand(0, 256)}, ${rand(0, 256)}, ${rand(0, 256)})`} fill={`rgb(${rand(0, 256)}, ${rand(0, 256)}, ${rand(0, 256)})`} />
          })}
        </AreaChart>
      );
    break;
  }
}



export default Chart;