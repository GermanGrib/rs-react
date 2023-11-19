import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { userSearchValue } from '../../const';

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState: {
    searchValue: localStorage.getItem(userSearchValue) || '',
  },
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchValueSlice.actions;
export default searchValueSlice.reducer;
