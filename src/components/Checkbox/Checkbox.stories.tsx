import { FC, useState } from 'react';

import Checkbox from './index';

export default {
  title: 'components/Checkbox',
  component: Checkbox,
};

export const Default: FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      name="name"
      id="name"
      className=""
      checked={isChecked}
      disabled={false}
      onBlur={() => {}}
      onChange={() => setIsChecked(!isChecked)}
      text="Default checkbox for Storybook"
    />
  );
};
