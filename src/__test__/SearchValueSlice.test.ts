import inputValueReducer, {
  setSearchValue,
} from '../store/slices/searchValueSlice';

describe('Test pokemonSlice', () => {
  test('Should test default state', () => {
    const res = inputValueReducer(undefined, { type: '' });
    expect(res).toEqual({ searchValue: '' });
  });

  test('Should save input value', () => {
    const action = { type: setSearchValue.type, payload: 'Text' };
    const res = inputValueReducer({ searchValue: '' }, action);
    expect(res.searchValue).toBe('Text');
  });
});
