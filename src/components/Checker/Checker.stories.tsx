import React, { useState } from 'react';

import Checker from './index';

export default {
  title: 'components/Checker',
  component: Checker,
};

export const Default: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checker isChecked={isChecked} disabled={false} handleClick={() => setIsChecked(!isChecked)} />
  );
};
