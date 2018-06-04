import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Loader from './components/loader.js';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<Loader />, document.getElementById('root'));
//
// setTimeout(() => {
//   ReactDOM.render(<App />, document.getElementById('root'));
// }, 5500);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
