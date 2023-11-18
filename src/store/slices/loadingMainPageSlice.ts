import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const loadingMainPageSlice = createSlice({
  name: 'loadingMainPage',
  initialState: {
    loadingMainPage: true,
  },
  reducers: {
    setLoadingMainPage(state, action: PayloadAction<boolean>) {
      state.loadingMainPage = action.payload;
    },
  },
});

export const { setLoadingMainPage } = loadingMainPageSlice.actions;

export default loadingMainPageSlice.reducer;
