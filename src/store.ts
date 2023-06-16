import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import ticksReducer, { applyTicks } from './slices/ticks-slice';
import goldReducer from './slices/gold-slice';

const logger = createLogger({
  predicate: (_getState, action: {type: string}) => action.type !== applyTicks.type,
});

const store = configureStore({
  reducer: {
    ticks: ticksReducer,
    gold: goldReducer,
  },
  // Don't use logger for now, too noisy w/ ticks, maybe add back later w/ filter
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

export type AppStore = typeof store;

// Infer the `RootState` & `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
