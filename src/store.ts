import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import gameReducer, { applyTicks } from './slices/game-slice';
// import ticksReducer, { applyTicks } from './slices/ticks-slice';
// import goldReducer from './slices/gold-slice';

const logger = createLogger({
  predicate: (_getState, action: {type: string}) => action.type !== applyTicks.type,
});

const store = configureStore({
  reducer: {
    game: gameReducer,
    // ticks: ticksReducer,
    // gold: goldReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

export type AppStore = typeof store;

// Infer the `RootState` & `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
