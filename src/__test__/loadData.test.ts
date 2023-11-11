// Ваш тест
import { loadData } from '../Utils';
import { axios } from '../__mocks__/loadData';

describe('Test loadData function', () => {
  test('Should loads data without search value', async () => {
    global.localStorage.getItem = jest.fn();
    global.sessionStorage.getItem = jest.fn().mockReturnValue('10');
    try {
      const result = await loadData({
        offset: 0,
        options: { offset: '20', itemsLimit: '20' },
        searchValue: '',
      });

      expect(axios).toHaveBeenCalledWith({
        url: 'https://pokeapi.co/api/v2/pokemon',
        options: { itemsLimit: '10', offset: '0' },
      });

      expect(result).toEqual([{ name: 'Pikachu' }]);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  });
});
