import { configureStore } from '@reduxjs/toolkit';
// import { logger } from 'redux-logger';

import counterReducer from './slices/counter-slice';
import ticksReducer from './slices/ticks-slice';
import goldReducer from './slices/gold-slice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    ticks: ticksReducer,
    gold: goldReducer,
  },
  // Don't use logger for now, too noisy w/ ticks, maybe add back later w/ filter
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

// Infer the `RootState` & `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
