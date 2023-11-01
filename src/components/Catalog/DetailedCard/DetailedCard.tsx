import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { POKEMON_URL } from '../../../services/pokemonService/variables';
import { DetailedCardData } from '../../../types/interface';
import styles from './detailedCard.module.scss';

function DetailedCard(): ReactElement {
  const { cardId } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData(): Promise<void> {
    try {
      const response = await fetch(POKEMON_URL + '/' + cardId);
      if (response.ok) {
        const data = await response.json();
        setPokemonData(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      throw new Error('While fetch data: ');
    }
  }

  useEffect(() => {
    fetchData();
  }, [cardId]);

  if (isLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (!pokemonData) {
    return <></>;
  }

  const destroyComponent = (): void => {
    setPokemonData(null);
    setIsLoading(false);
  };

  const {
    name,
    weight,
    height,
    base_experience,
    types,
    sprites,
  }: DetailedCardData = pokemonData;

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src={sprites.front_default}
            alt="pokemon picture"
          />
        </div>
        <div>Name: {name}</div>
        <div>Weight: {weight}</div>
        <div>Height: {height}</div>
        <div>HP: {base_experience}</div>
        <ul className={styles.list}>
          {types.map((el) => (
            <li key={el.type.name}>Skill: {el.type.name}</li>
          ))}
        </ul>
        <button className={styles.button} onClick={destroyComponent}>
          Close detailed
        </button>
      </div>
    </div>
  );
}

export default DetailedCard;
