import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/Index';
import {Provider} from './containers/App';
import store from "./redux/store"
ReactDOM.render(
  <Provider store={store}>
     <App />
  </Provider>,
  document.getElementById('root')
);

