import { FC } from 'react';

import ImgLoader from './index';

export default {
  title: 'components/ImgLoader',
  component: ImgLoader,
};

export const Default: FC = () => {
  return (
    <div>
      <ImgLoader
        alt="alt"
        url="https://ipfs11.rocknblock.io/ipfs/QmeocSSC1v2rTJvcbHju1tXDvVzxUYJhyz9wdj27C6MwhK"
        height={300}
        width={300}
      />
    </div>
  );
};
