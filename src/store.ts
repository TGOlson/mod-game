import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import counterReducer from './slices/counter-slice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

// Infer the `RootState` & `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
