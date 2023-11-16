import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const itemsPerPageSlice = createSlice({
  name: 'maxItemsPerPage',
  initialState: {
    maxItemsPerPage: '20',
  },
  reducers: {
    setMaxItemsPerPage(state, action: PayloadAction<string>) {
      state.maxItemsPerPage = action.payload;
    },
  },
});

export const { setMaxItemsPerPage } = itemsPerPageSlice.actions;

export default itemsPerPageSlice.reducer;
