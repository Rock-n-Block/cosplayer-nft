import React, { CSSProperties } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../src/store/configureStore';
import { Connect } from '../src/services';
import '../src/styles/index.scss';
import '../src/styles/_app.scss';

export const Decorator = (story: any) => {
  const styles: CSSProperties = {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Provider store={store}>
      <Connect>
        <div style={styles}>
          <Router>{story()}</Router>
        </div>
      </Connect>
    </Provider>
  );
}

addDecorator(Decorator);

export const parameters = { layout: 'fullscreen' };
