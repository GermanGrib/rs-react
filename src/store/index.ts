import { configureStore } from '@reduxjs/toolkit';

import { getCountries } from './slices/countryAPI';
import itemsPerPageReducer from './slices/formSlice';

const store = configureStore({
  reducer: {
    itemsPerPage: itemsPerPageReducer,
    [getCountries.reducerPath]: getCountries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getCountries.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
