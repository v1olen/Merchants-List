import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import configureStore from '@Store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import merchantsList from '@API/merchants';
import Merchant from '@Classes/Merchant';

const store = configureStore();

merchantsList.forEach(
  merchant => store.dispatch({
    type: `ADD_MERCHANT`,
    merchant: new Merchant(merchant),
  }),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
