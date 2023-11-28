import { configureStore } from '@reduxjs/toolkit';

import itemsPerPageReducer from './slices/itemsPerPageSlice';

const store = configureStore({
  reducer: {
    itemsPerPage: itemsPerPageReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
