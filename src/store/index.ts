import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './slices/uiSlice';
import { authSlice } from './slices/authSlice';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefault) =>
    getDefault({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
