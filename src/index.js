import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

function renderRoot() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

ReactDOM.render(renderRoot(), document.getElementById('root'));
registerServiceWorker();
