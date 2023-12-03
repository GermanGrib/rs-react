import { configureStore } from '@reduxjs/toolkit';

import { countriesApi } from './slices/countryAPI';
import dataFormReducer from './slices/formSlice';

const store = configureStore({
  reducer: {
    dataForm: dataFormReducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
