import React, { ReactElement, ReactNode } from 'react';

import { PokemonGeneralResponse } from '../../services/types/interface';
import { Catalog } from '../Catalog';
import MainLayout from '../MainLayout';
import styles from './layout.module.scss';

interface LayoutProps {
  pokemonData: PokemonGeneralResponse;
  children?: ReactNode;
  closeDetailedView?: () => void;
  isDetailed?: boolean;
}

function Layout({
  pokemonData,
  children,
  isDetailed,
}: LayoutProps): ReactElement {
  return (
    <MainLayout>
      <div className={isDetailed ? styles.root : ''}>
        <Catalog pokemonData={pokemonData} />
        {children}
      </div>
    </MainLayout>
  );
}

export default Layout;
