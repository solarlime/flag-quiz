import { defineConfig } from '@rspack/cli';

export default defineConfig({
  extends: './rspack.common.js',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: { port: 5173, hot: true, historyApiFallback: true },
});
