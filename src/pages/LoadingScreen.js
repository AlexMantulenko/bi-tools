import React from 'react';
import ReactLoading from "react-loading";

import './styles/LoadingScreen.css';

const LoadingScreen = () => {
    return (
      <div className="loading-screen">
        <div className="opacity-block">
            <ReactLoading type="spinningBubbles" color="#fff" height={'15%'} width={'15%'} />
        </div>
      </div>
    );
  }
  
export default LoadingScreen;
  