import { configureStore } from '@reduxjs/toolkit';

import itemsPerPageReducer from './slices/itemsPerPageSlice';
import searchValueReducer from './slices/searchValueSlice';

const store = configureStore({
  reducer: {
    searchValue: searchValueReducer,
    itemsPerPage: itemsPerPageReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
