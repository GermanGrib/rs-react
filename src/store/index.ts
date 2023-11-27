import { configureStore } from '@reduxjs/toolkit';

import { pokemonApi } from '../services/rtkQuery/pokemonApi';
import itemsPerPageReducer from './slices/itemsPerPageSlice';
import loadingMainDetailedReducer from './slices/loadingDetailedPageSlice';
import loadingMainPageReducer from './slices/loadingMainPageSlice';
import searchValueReducer from './slices/searchValueSlice';

const store = configureStore({
  reducer: {
    searchValue: searchValueReducer,
    itemsPerPage: itemsPerPageReducer,
    loadingMainPage: loadingMainPageReducer,
    loadingDetailedPage: loadingMainDetailedReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
