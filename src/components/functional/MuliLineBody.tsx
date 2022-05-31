import type { FC } from 'react';
import { Fragment } from 'react';

export const MultiLineBody: FC<{ body: string }> = ({ body }) => {
  const texts = body.split('\n').map((item) => {
    return (
      <Fragment key={item}>
        {item}
        <br />
      </Fragment>
    );
  });
  return <>{texts}</>;
};
