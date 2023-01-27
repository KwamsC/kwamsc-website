import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from "styled-components";
import Theme from "./styles/theme";
import { GlobalStyles } from "./styles/globalStyles";
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);