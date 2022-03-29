import { IS_PRODUCTION } from '@/config';

type TLogger = 'log' | 'error' | 'warn' | 'info';

/**
 * @param {string} [title] set the title of info
 * @param {string} [msg] main block of the info
 * @param {string} [type] type of log
 */
const logger = (title?: string, msg?: string | any, type: TLogger = 'info'): void => {
  if (!IS_PRODUCTION) {
    console[type](title, msg);
  }
};

export default logger;
