import { axios } from '../services/pokemonService';

describe('Test axios function', () => {
  test('Should returns data from a regular fetch without options', async () => {
    const url = 'https://api.example.com/data';
    const data = [{ id: 1, name: 'Test Data' }];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    });

    const result = await axios({ url });

    expect(result).toEqual(data);
    expect(fetch).toHaveBeenCalledWith(url);
  });

  test('Should returns data from a fetch with options', async () => {
    const url = 'https://api.example.com/search';
    const options = {
      searchString: 'query',
      itemsLimit: '10',
      searchID: 123,
      offset: '20',
    };
    const expectedUrl = `${url}?limit=${options.itemsLimit}&offset=${options.offset}/${options.searchString}/${options.searchID}`;
    const data = [{ id: 1, name: 'Test Data' }];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    });

    const result = await axios({ url, options });

    expect(result).toEqual(data);
    expect(fetch).toHaveBeenCalledWith(expectedUrl);
  });

  test('Should throws an error during axios call', async () => {
    const url = 'https://api.example.com/data';

    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));

    await expect(axios({ url })).rejects.toThrow('During axios');
  });
});
