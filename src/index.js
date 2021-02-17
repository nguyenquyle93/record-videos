import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ModuleTest from './ModuleTest';
import ScreenRecord from './Components/ScreenRecord/ScreenRecord';
import Record from './Components/Record/Record';

import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css";
import Crop from './Components/ScreenRecord/Crop';

ReactDOM.render(
  <React.StrictMode>
    {/* <App />
    <ModuleTest /> */}
    <ScreenRecord />
    {/* <Crop /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
