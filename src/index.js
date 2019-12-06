import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./client/react/components/index";
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {userListstore} from "./client/redux/store/store"
ReactDOM.render(
<Provider store={userListstore}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
