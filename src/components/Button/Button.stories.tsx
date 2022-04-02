import React, { CSSProperties } from 'react';

import Button from './index';

export default {
  title: 'components/Button',
  component: Button,
};

export const Default: React.FC = () => {
  const styles: CSSProperties = {
    width: '92px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div>
      <Button color="default">
        <div style={styles}>Button</div>
      </Button>
      <br />
      <Button color="blue">
        <div style={styles}>Button</div>
      </Button>
      <br />
      <Button color="orange">
        <div style={styles}>Button</div>
      </Button>
      <br />
      <Button color="red">
        <div style={styles}>Button</div>
      </Button>
      <br />
      <Button color="bordered">
        <div style={styles}>Button</div>
      </Button>
      <br />
      <Button color="white">
        <div style={styles}>Button</div>
      </Button>
      <br />
      <Button color="grey">
        <div style={styles}>Button</div>
      </Button>
      <br />
      <Button color="inactive">
        <div style={styles}>Button</div>
      </Button>
      <br />
      <Button color="disabled">
        <div style={styles}>Button</div>
      </Button>
    </div>
  );
};
