# @skarab/eslint-staged

Refines [lint-staged] functionality, enforcing strict adherence to ESLint's ignored file configurations.

This package provides a CLI tool (`eslint-staged`) designed to run ESLint on staged files, considering the files in `.eslintignore` and `ignorePatterns`.

It resolves the [common issue] ([1], [2]) where [lint-staged] pass files ignored by ESLint.

## Installation

```bash
pnpm add @skarab/eslint-staged --save-dev
```

## Usage

In your `package.json`, configure [lint-staged] as follows:

```ts
"lint-staged": {
  "*": [
    "pnpm eslint-staged --fix --max-warnings=0",
    "pnpm prettier --write --ignore-unknown"
  ]
}
```

---

Scaffolded with [@skarab/skaffold](https://www.npmjs.com/package/@skarab/skaffold)

[lint-staged]: https://github.com/lint-staged/lint-staged
[common issue]: https://www.curiouslychase.com/posts/eslint-error-file-ignored-because-of-a-matching-ignore-pattern/
[1]: https://github.com/lint-staged/lint-staged/issues/584#issue-413947299
[2]: https://github.com/eslint/eslint/issues/16602#issue-1470373542
