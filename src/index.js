import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider, css } from 'reakit';
import defaultTheme from 'reakit-theme-default';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const theme = {
  ...defaultTheme,

  Button: `
  //background-color: orange;
    margin-top: 20px;
  //font: inherit;
    arrange: center;
    padding: 5px;
    margin-left: 35px;
    cursor: pointer;
   `,

  Overlay: css`
    ${defaultTheme.Overlay};
    border: 1px solid orange;
  `,
};

ReactDOM.render(
  <Provider theme={theme}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
