import React, { useState } from 'react';
import StartScreen from './pages/StartScreen';
import LoadingScreen from './pages/LoadingScreen';
import DataScreen from './pages/DataScreen';

import './App.css';

function App() {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);

  const [showLoading, setShowLoading] = useState(false);

  const setCsvFile = (fl, flInfo) => {
    setFile(fl);
    setFileInfo(flInfo);
    setIsFileSelected(true);
    setShowLoading(true);
    setTimeout(() => setShowLoading(false), 3000);
  }

  const goBack = () => {
    setIsFileSelected(false);
    setFile(null);
    setFileInfo(null);
  }

  return (
    <div>
      { isFileSelected ? (showLoading ? <LoadingScreen /> : <DataScreen csvData={file} fileInfo={fileInfo} goBack={goBack} /> ) : <StartScreen setCsvFile={setCsvFile} /> }
    </div>
  );
}

export default App;
