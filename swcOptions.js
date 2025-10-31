/** @type {import('@rspack/core').SwcLoaderOptions} */

const browsersList =
  'defaults, edge >= 109, iOS >= 12.1, safari >= 12.1, not op_mini all';

const swcOptions = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: true,
      decorators: true,
    },
    transform: {
      decoratorVersion: '2022-03',
      react: {
        runtime: 'automatic',
      },
    },
  },
  env: {
    targets: browsersList,
  },
};

export { swcOptions, browsersList };
