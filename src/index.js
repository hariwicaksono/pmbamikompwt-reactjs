import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'argon-design-system-react/src/assets/scss/argon-design-system-react.scss?v1.1.0';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'react-notifications/lib/notifications.css';
import 'spin.js/spin.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
