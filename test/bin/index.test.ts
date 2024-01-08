import * as path from 'node:path';

import { execaSync } from 'execa';
import { describe, expect, it } from 'vitest';

// eslint-disable-next-line unicorn/prefer-module
const fixturesPath = path.resolve(__dirname, '..', '__fixtures__');

// eslint-disable-next-line unicorn/prefer-module
const binPath = path.resolve(__dirname, '..', '..', 'output', 'bin', 'index.js');

describe('eslint-staged', () => {
  it('should return undefined result with empty parameters', () => {
    const { stdout } = execaSync(process.execPath, [binPath], { cwd: fixturesPath });

    expect(stdout).toBe('');
  });

  it('should return undefined result with ignored file', () => {
    const { stdout } = execaSync(process.execPath, [binPath, path.join(fixturesPath, 'ignored-file.ts')], {
      cwd: fixturesPath,
    });

    expect(stdout).toBe('');
  });

  it('should return error result with included file', () => {
    expect(() =>
      execaSync(process.execPath, [binPath, path.join(fixturesPath, 'included-file.ts')], { cwd: fixturesPath }),
    ).toThrowError('Unexpected console statement');
  });
});
