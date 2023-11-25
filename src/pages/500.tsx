import Link from 'next/link';
import React, { ReactElement } from 'react';

export default function Error500(): ReactElement {
  return (
    <div>
      <div>We will fix it, promise</div>
      <Link href="/">Lets go home</Link>
    </div>
  );
}
