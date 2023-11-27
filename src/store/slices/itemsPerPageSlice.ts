import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ItemsPerPageState {
  limit: string;
  currentPage: string;
  readonly offset: string;
}

const itemsPerPageSlice = createSlice({
  name: 'maxItemsPerPage',
  initialState: {
    limit: '20',
    currentPage: '0',
    get offset() {
      return `${Number(this.currentPage) * Number(this.limit) || 0}`;
    },
  } as ItemsPerPageState,
  reducers: {
    setMaxItemsPerPage(state, action: PayloadAction<string>) {
      state.limit = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<string>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setMaxItemsPerPage, setCurrentPage } = itemsPerPageSlice.actions;

export default itemsPerPageSlice.reducer;
