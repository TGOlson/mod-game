import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './pages/App';

import "./index.css";
import store from './store';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOMClient.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
