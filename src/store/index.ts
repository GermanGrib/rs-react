import { configureStore } from '@reduxjs/toolkit';

import { pokemonApi } from '../services/rtkQuery/pokemonApi';
import itemsPerPageReducer from './slices/itemsPerPageSlice';
import loadingMainPageReducer from './slices/loadingMainPageSlice';
import pokemonDataReducer from './slices/pokemonDataSlice';
import searchValueReducer from './slices/searchValueSlice';

const store = configureStore({
  reducer: {
    searchValue: searchValueReducer,
    itemsPerPage: itemsPerPageReducer,
    loadingMainPage: loadingMainPageReducer,
    pokemonData: pokemonDataReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
