import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState: {
    searchValue: '',
  },
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchValueSlice.actions;
export default searchValueSlice.reducer;
