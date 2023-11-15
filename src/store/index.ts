import { configureStore } from '@reduxjs/toolkit';

import searchValueReducer from './slices/searchValueSlice';

const store = configureStore({
  reducer: {
    searchValue: searchValueReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
