import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppDataProvider from './context';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <AppDataProvider>
    <App />
  </AppDataProvider>,
  document.getElementById('root'),
);
