import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './pages/App';

import "./index.css";
import store from './store';
import { applyTicks } from './slices/ticks-slice';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOMClient.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

let lastTick = 0;
let frameId = 0;
const gameLoop = (tick: number) => {
  const tickRate = store.getState().ticks.tickRate;

  if(lastTick === 0) lastTick = tick;

  const deltaMs = tick - lastTick;
  const deltaTicks = Math.floor(deltaMs / tickRate);
  
  if (deltaTicks > 0) {
    console.log('aplying tick delta', deltaTicks);
    store.dispatch(applyTicks(deltaTicks));
    lastTick = tick;
  }
  
  frameId = requestAnimationFrame(gameLoop);
};

frameId = requestAnimationFrame(gameLoop);
