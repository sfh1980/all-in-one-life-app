import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import calendarSlice from './slices/calendarSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    calendar: calendarSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
