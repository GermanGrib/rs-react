import React, { ReactElement, ReactNode } from 'react';

import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps): ReactElement {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
    </>
  );
}

export default MainLayout;
