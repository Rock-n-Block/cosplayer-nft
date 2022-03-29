import { Home, Token } from '@/pages';

export const routes = [
  {
    name: 'Home',
    path: '/',
    component: <Home />,
  },
  {
    name: 'Token',
    path: '/tokens/:id',
    component: <Token />,
  },
];
