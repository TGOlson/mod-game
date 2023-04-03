import React from 'react';
import ReactDOMClient from 'react-dom/client';

import App from './pages/App';

import "./index.css";

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOMClient.createRoot(rootElement);
root.render(<App />);
