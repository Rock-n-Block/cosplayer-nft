import { FC } from 'react';

import FormInput from './index';

export default {
  title: 'components/FormInput',
  component: FormInput,
};

export const Default: FC = () => (
  <div style={{ width: '70%' }}>
    <FormInput color="grey" type="text" placeholder="Enter your text" />
    <br />
    <FormInput color="white" type="number" placeholder="Enter your number" />
  </div>
);
