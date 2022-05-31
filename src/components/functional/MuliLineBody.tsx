import type { FC } from 'react';
import { Fragment } from 'react';

export const MultiLineBody: FC<{ body: string }> = ({ body }) => {
  const texts = body.split('\n').map((item, index, array) => {
    return (
      <Fragment key={index}>
        {item}
        {index < array.length - 1 && <br />}
      </Fragment>
    );
  });
  return <>{texts}</>;
};
