/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable no-console */
import { ESLintStaged } from '../index.js';

ESLintStaged(process.argv.slice(2))
  .then((error) => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
    }
    return error;
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
