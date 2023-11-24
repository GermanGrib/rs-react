import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { useAppDispatch } from '../../../hooks/reduxHooks';
import { useGetPokemonsQuery } from '../../../services/rtkQuery/pokemonApi';
import { setLoadingDetailedPage } from '../../../store/slices/loadingDetailedPageSlice';
import { DetailedCardProps } from '../../../types/interface';
import styles from './detailedCard.module.scss';

function DetailedCard(): ReactElement {
  const router = useRouter();
  const { detailed: pokemonId } = router.query;
  const { data: apiPokemonData, isFetching: dataIsLoading } =
    useGetPokemonsQuery({ name: String(pokemonId) });
  const dispatch = useAppDispatch();
  dispatch(setLoadingDetailedPage(dataIsLoading));

  if (dataIsLoading && pokemonId) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (!apiPokemonData) {
    return <></>;
  }

  const destroyComponent = (): void => {
    router.push('/');
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
