import * as path from 'node:path';

import { beforeAll, describe, expect, it, vi } from 'vitest';

import { ESLintStaged } from '../source/index.js';

// eslint-disable-next-line unicorn/prefer-module
const fixturesPath = path.resolve(__dirname, '__fixtures__');

beforeAll(() => {
  vi.spyOn(process, 'cwd').mockReturnValue(fixturesPath);
});

describe('ESLintStaged', () => {
  it('should return undefined result with empty parameters', async () => {
    const result = await ESLintStaged([]);

    expect(result).toBeUndefined();
  });

  it('should return undefined result with ignored file', async () => {
    const result = await ESLintStaged(['ignored-file.ts']);

    expect(result).toBeUndefined();
  });

  it('should return error result with included file', async () => {
    const result = await ESLintStaged(['included-file.ts']);

    expect(result).toMatch('Unexpected console statement');
  });
});
