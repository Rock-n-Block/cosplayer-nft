export * from './connect';
export * from './context';
export * from './store';

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;

export type ICategory = {
  name: string;
  logo: string;
  isActive: boolean;
};
