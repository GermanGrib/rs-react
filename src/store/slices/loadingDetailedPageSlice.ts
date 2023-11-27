import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const loadingDetailedPageSlice = createSlice({
  name: 'loadingDetailedPage',
  initialState: {
    loadingDetailedPage: true,
  },
  reducers: {
    setLoadingDetailedPage(state, action: PayloadAction<boolean>) {
      state.loadingDetailedPage = action.payload;
    },
  },
});

export const { setLoadingDetailedPage } = loadingDetailedPageSlice.actions;

export default loadingDetailedPageSlice.reducer;
