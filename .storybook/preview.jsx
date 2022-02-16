import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { addDecorator } from '@storybook/react';

export const Decorator = (story) => <Router>{story()}</Router>;

addDecorator(Decorator);
