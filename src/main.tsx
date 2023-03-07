import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './antd.css';

import { Provider } from 'react-redux';
import { store } from '@src/store-redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
