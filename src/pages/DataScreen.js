import React from 'react';
import {Switch, Route, BrowserRouter as Router, NavLink } from 'react-router-dom';
import DataSource from './DataSource';
import DataVisual from './DataVisual';

import './styles/DataScreen.css';

const DataScreen = ({ csvData, goBack, fileInfo }) => {

  return (
    <Router>
        <div className="data-screen">
          <div className="back-btn">
            <button onClick={goBack}>
              <span className="material-icons">keyboard_backspace</span>
            </button>
          </div>

          <div className="data">
            <Switch>
              <Route path="/data-source" exact>
                <DataSource data={csvData} fileInfo={fileInfo} />
              </Route>
              <Route path="/data-visualization">
                <DataVisual data={csvData} />
              </Route>
            </Switch>
          </div>

          <div className="nav">
            <ul>
              <li><NavLink to="/data-source">Data Source</NavLink></li>
              <li><NavLink to="/data-visualization">Visualization</NavLink></li>
            </ul>
          </div>
        </div>
    </Router>
    
  );
}

export default DataScreen;
