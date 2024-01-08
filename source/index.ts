import { ESLint } from 'eslint';

/**
 * Asynchronously lints staged files, excluding those ignored by ESLint.
 *
 * This function is designed to resolve the "File ignored because of a matching ignore pattern"
 * error encountered when using ESLint with lint-staged. It filters out files that are specified
 * in the `.eslintignore` file or in the `.eslintrc.js` under the `ignorePatterns` property,
 * ensuring only relevant files are linted during the staging process.
 *
 * @param parameters - An array of strings representing ESLint cli arguments and file paths to be linted.
 *                     It excludes files that start with a hyphen and those ignored by ESLint.
 *
 * @returns A Promise that resolves to a string containing the lint results, or `undefined`
 *          if there are no linting issues or all files are ignored.
 *
 * @example
 * ```
 * ESLintStaged(['src/index.ts', 'src/app.ts']).then(result => {
 *   if (result) {
 *     console.log(result);
 *   } else {
 *     console.log('No linting errors or warnings found.');
 *   }
 * }).catch(error => {
 *   console.error('Linting error:', error);
 * });
 * ```
 *
 * Note: This function is compatible with ESLint version 7.5 and later. It addresses compatibility
 * issues with ES6 modules, and adjustments for CommonJS syntax may be necessary in some cases.
 */
export async function ESLintStaged(parameters: string[]): Promise<string | undefined> {
  const eslint = new ESLint();
  const files: string[] = [];

  for (const parameter of parameters) {
    if (parameter.startsWith('-') === false && (await eslint.isPathIgnored(parameter)) === false) {
      files.push(parameter);
    }
  }

  const results = await eslint.lintFiles(files);
  const formatter = await eslint.loadFormatter('stylish');
  const resultText = await formatter.format(results);

  if (resultText.length === 0) {
    return;
  }

  return resultText;
}
