import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import CSSMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import common from './webpack.common.js';

const mode = 'production';

export default merge(common(mode), {
  output: {
    publicPath: '/',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
      }),
      new CSSMinimizerPlugin({
        minify: CSSMinimizerPlugin.cssoMinify,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    ],
  },
});
