import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IForm } from '../../types/interface';

interface updateForm extends Omit<IForm, 'picture'> {
  picture: string | null;
}

interface IState {
  form: updateForm[];
}

const initialState: IState = {
  form: [],
};

const dataFormSlice = createSlice({
  name: 'dataForm',
  initialState,
  reducers: {
    setDataForm(state, action: PayloadAction<updateForm>) {
      state.form = state.form.concat(action.payload);
    },
  },
});

export const { setDataForm } = dataFormSlice.actions;

export default dataFormSlice.reducer;
