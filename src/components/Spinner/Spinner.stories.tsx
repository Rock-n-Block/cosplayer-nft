import { FC } from 'react';

import Spinner from './index';

export default {
  title: 'components/Spinner',
  component: Spinner,
};

export const Default: FC = () => (
  <div>
    <div>
      <Spinner color="blue" size="sm" />
      <Spinner color="blue" size="md" />
      <Spinner color="blue" size="lg" />
    </div>
    <div>
      <Spinner color="white" size="sm" />
      <Spinner color="white" size="md" />
      <Spinner color="white" size="lg" />
    </div>
  </div>
);
