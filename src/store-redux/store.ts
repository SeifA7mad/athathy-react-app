import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user-slice';

export const store = configureStore({
  reducer: { user: userSlice },
  devTools: process.env.NODE_ENV === 'development'
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
