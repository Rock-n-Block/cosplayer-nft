import { FC } from 'react';

import { Button } from 'components';

import { routes } from 'appConstants';

type ExploreProps = {
  className: string;
};

const Explore: FC<ExploreProps> = ({ className }) => {
  return (
    <Button className={className} href={routes.home.root}>
      Explore
    </Button>
  );
};

export default Explore;
