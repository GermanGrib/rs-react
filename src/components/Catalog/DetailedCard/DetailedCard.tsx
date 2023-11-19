import React, { ReactElement } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { paths } from '../../../router/const';
import { useGetPokemonsQuery } from '../../../services/rtkQuery/pokemonApi';
import { DetailedCardProps } from '../../../types/interface';
import styles from './detailedCard.module.scss';

function DetailedCard(): ReactElement {
  const [searchParams] = useSearchParams();
  const cardId = searchParams.get('detailed');
  const navigate = useNavigate();
  const { data: apiPokemonData, isLoading: dataIsLoading } =
    useGetPokemonsQuery({ name: String(cardId) });

  if (dataIsLoading && searchParams.get('detailed')) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (!apiPokemonData) {
    return <></>;
  }

  const destroyComponent = (): void => {
    navigate(paths.home);
  };

  const {
    name,
    weight,
    height,
    base_experience,
    types,
    sprites,
  }: DetailedCardProps = apiPokemonData as DetailedCardProps;

  return (
    <div className={styles.root} data-testid="detailed-card">
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
