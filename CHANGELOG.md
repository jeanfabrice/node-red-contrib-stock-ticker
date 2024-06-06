# Change Log

## 2.0.1

### Patch Changes

- Update dependencies to fix the ticker

  This should fix the ticker, because apparently yahoo now requires some cookie.
  See also: https://github.com/gadicc/node-yahoo-finance2/issues/633 ([fa8bb38](https://gitlab.com/leipert-projects/npm-packages/commit/fa8bb38))

## 2.0.0

### Major Changes

- Require at least node@12 and node-red@2 ([b66abd0](https://gitlab.com/leipert-projects/npm-packages/commit/b66abd0))

### Minor Changes

- Update protobufjs dependency to major version 7. ([b66abd0](https://gitlab.com/leipert-projects/npm-packages/commit/b66abd0))

- Migrate to [yahoo-finance2](https://www.npmjs.com/package/yahoo-finance2).

  It seems more stable and is well maintained, compared to the previous `yahoo-finance`. ([b66abd0](https://gitlab.com/leipert-projects/npm-packages/commit/b66abd0))

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.3.0](https://gitlab.com/leipert-projects/npm-packages/compare/@leipert/node-red-contrib-stock-ticker@1.2.0...@leipert/node-red-contrib-stock-ticker@1.3.0) (2021-11-08)

### Bug Fixes

- Better error handling ([8b59ffb](https://gitlab.com/leipert-projects/npm-packages/commit/8b59ffba7bb96d71b7dcf7ea3c1c92e631333011))

### Features

- Add a stock-request node ([b8adad7](https://gitlab.com/leipert-projects/npm-packages/commit/b8adad7a713e113081cdbbad94bf19ef4934e599))
- Add second output for status ([22148aa](https://gitlab.com/leipert-projects/npm-packages/commit/22148aa4e4f36a4236f993130f6bdde769fdcf39))

# [1.2.0](https://gitlab.com/leipert-projects/npm-packages/compare/@leipert/node-red-contrib-stock-ticker@1.1.1...@leipert/node-red-contrib-stock-ticker@1.2.0) (2021-11-05)

### Features

- Minor improvements ([c3802e3](https://gitlab.com/leipert-projects/npm-packages/commit/c3802e394b0c921c0f69a1bcdefdd9bbf2216f29))

## [1.1.1](https://gitlab.com/leipert-projects/npm-packages/compare/@leipert/node-red-contrib-stock-ticker@1.1.0...@leipert/node-red-contrib-stock-ticker@1.1.1) (2021-11-01)

### Bug Fixes

- Mark package as public ([dfb7444](https://gitlab.com/leipert-projects/npm-packages/commit/dfb744466e39460f33443e2f63275b55e3fc4409))

# 1.1.0 (2021-11-01)

### Features

- Initial version of npm package for node-red ([f8892a6](https://gitlab.com/leipert-projects/npm-packages/commit/f8892a6cba89cc34aa9982b489f966c7f0af7ddc))
