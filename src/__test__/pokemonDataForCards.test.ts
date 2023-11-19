import { IPokemonData } from '../types/interface';
import { pokemonDataForCards } from '../utils';

describe('Test pokemonDataForCards function', () => {
  test('Should extract the necessary card data from the full pokemon data', () => {
    const fullData: IPokemonData = {
      name: 'Pikachu',
      weight: '60',
      height: '40',
      base_experience: '112',
      id: '25',
      sprites: { front_default: 'pikachu.png' },
    };

    const result = pokemonDataForCards(fullData);
    expect(result.cardTitle).toBe('Pikachu');
    expect(result.weight).toBe('60');
    expect(result.height).toBe('40');
    expect(result.experience).toBe('112');
    expect(result.id).toBe('25');
    expect(result.imgSrc).toBe('pikachu.png');
  });
});
