import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider as ReakitProvider, css } from 'reakit';
import defaultTheme from 'reakit-theme-default';
import { Provider } from 'unstated';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { ProblemContainerObject } from './containers/ProblemContainer';

const theme = {
  ...defaultTheme,

  Overlay: css`
    ${defaultTheme.Overlay};
    border: 1px solid orange;
  `,
};

ReactDOM.render(
  <Provider inject={[ProblemContainerObject]}>
    <ReakitProvider theme={theme}>
      <App />
    </ReakitProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
