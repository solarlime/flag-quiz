import { merge } from 'webpack-merge';
import common from './webpack.common.js';

const mode = 'development';

export default merge(common(mode), {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: { port: 5173, hot: true, historyApiFallback: true },
});
