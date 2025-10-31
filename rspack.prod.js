import { rspack } from '@rspack/core';
import { defineConfig } from '@rspack/cli';

export default defineConfig({
  extends: './rspack.common.js',
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin({
        minimizerOptions: {
          minify: true,
        },
      }),
      new rspack.LightningCssMinimizerRspackPlugin(),
    ],
  },
});
