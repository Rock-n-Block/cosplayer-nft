import { errorStatuses, validStatuses } from 'appConstants';

export const validateStatus = (status: number): boolean =>
  [...validStatuses, ...errorStatuses].includes(status);
