import { FC, memo } from 'react';

import { Button } from 'components';

type ExploreProps = {
  className: string;
};

const Explore: FC<ExploreProps> = ({ className }) => {
  return (
    <Button className={className} onClick={() => {}}>
      Explore
    </Button>
  );
};

export default memo(Explore);
