import './index.css';

import { CssBaseline, createMuiTheme } from '@material-ui/core';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import reportWebVitals from './reportWebVitals';
import store from './components/Redux/store';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
  },
  overrides: {
    MuiInputBase: {
      input: {
        '&:-webkit-autofill': {
          // hack to remove the autofill
          transitionDelay: '999999s',
          transitionProperty: 'background-color, color',
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <Route exact path="/auth"></Route>
          <App />
          {/* <Route exact path = "/confirm">
            <ConfirmComponent/>
          </Route> */}
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
