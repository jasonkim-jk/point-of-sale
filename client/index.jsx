import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { ThemeProvider } from '@material-ui/core/styles';
import defaultTheme from './themes/DefaultTheme';

ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <App />
  </ThemeProvider>,
  document.querySelector('#root')
);
