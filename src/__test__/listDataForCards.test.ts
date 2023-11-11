// Create a mock axios function to simulate API calls
import { listDataForCards } from '../Utils';

jest.mock('../services/pokemonService', () => ({
  axios: jest.fn().mockResolvedValue({
    name: 'Pikachu',
    weight: 60,
    height: 40,
    base_experience: 112,
    id: 25,
    sprites: { front_default: 'pikachu.png' },
  }),
}));

describe('Test listDataForCards function', () => {
  test('Should fetch data and return an array of card data', async () => {
    const data = [{ name: 'pikachu', url: 'some-url' }];

    const result = await listDataForCards(data);
    expect(result).toHaveLength(data.length);

    expect(result[0].cardTitle).toBe('Pikachu');
    expect(result[0].weight).toBe(60);
    expect(result[0].height).toBe(40);
    expect(result[0].experience).toBe(112);
    expect(result[0].id).toBe(25);
    expect(result[0].imgSrc).toBe('pikachu.png');
  });
});
