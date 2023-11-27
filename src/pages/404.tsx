import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { DEFAULT_QUERY_CATALOG } from '../const';

const styles: Record<string, string> = {
  display: 'flex',
  position: 'absolute',
  justifyContent: 'center',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  height: '20vh',
  backgroundColor: 'white',
  fontSize: '3rem',
  borderRadius: '0.8rem',
  textAlign: 'center',
};

function Error404(): ReactElement {
  const router = useRouter();

  function handleClick(): void {
    router.push({ pathname: '/', query: DEFAULT_QUERY_CATALOG });
  }

  return (
    <div style={styles}>
      <div>We broke something, sorry</div>
      <button onClick={handleClick}> Go Home</button>
    </div>
  );
}

export default Error404;
