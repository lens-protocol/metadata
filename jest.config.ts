import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['\\.snap$', '/node_modules/', '/dist/'],
  moduleNameMapper: {
    // see https://github.com/jestjs/jest/issues/9430#issuecomment-1676252021
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  prettierPath: require.resolve('prettier-2'),
};

// eslint-disable-next-line import/no-default-export
export default config;
