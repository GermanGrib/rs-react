import Link from 'next/link';
import React, { ReactElement } from 'react';

function Error404(): ReactElement {
  return (
    <div>
      <div>We broke something, sorry</div>
      <Link href="/">Go on the main page</Link>
    </div>
  );
}

export default Error404;
