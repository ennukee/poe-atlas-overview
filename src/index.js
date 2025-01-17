import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
      <Main />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
