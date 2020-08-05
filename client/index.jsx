import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />,
  </ThemeProvider>,
  document.querySelector('#root')
);
