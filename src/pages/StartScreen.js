import React from 'react';
import CSVReader from "react-csv-reader";
 
import './styles/StartScreen.css';

const StartScreen = ({ setCsvFile }) => {
  const handleForce = (data, fileInfo) => setCsvFile(data, fileInfo);

  const parseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };

  return (
    <div className="start-screen">
      <div className="opacity-block">
        <div className="choose-file">
          <p>Select your CSV-file</p>
          <CSVReader
            cssClass="react-csv-input"
            onFileLoaded={handleForce}
            parserOptions={parseOptions}
          />
        </div>
      </div>
    </div>
  );
}
  
export default StartScreen;
  