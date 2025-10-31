import path, { dirname } from 'path';
import { rspack } from '@rspack/core';
import { fileURLToPath } from 'url';
import Dotenv from 'dotenv-webpack';
import { swcOptions, browsersList } from './swcOptions.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // получает имя, то есть node_modules/packageName/not/this/part.js
            // или node_modules/packageName
            const match = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            );

            // сюда же попадает сторонний css
            const packageName = match?.[1];
            if (packageName) {
              // некоторые серверы не любят символы наподобие @
              return `vendor.${packageName.replace('@', '')}`;
            }
            return `vendor.${crypto.randomUUID()}`;
          },
        },
      },
    },
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(m?js|jsx)$/,
        // some developers don't transpile their code
        exclude: (modulePath) =>
          /node_modules/.test(modulePath) &&
          !/(uuid|radix-ui|react-router)/.test(modulePath),
        use: {
          loader: 'builtin:swc-loader',
          options: swcOptions,
          type: 'javascript/auto',
        },
      },
      {
        test: /\.(m?ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'builtin:swc-loader',
          options: swcOptions,
          type: 'javascript/auto',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          rspack.CssExtractRspackPlugin.loader,
          'css-loader',
          {
            loader: 'builtin:lightningcss-loader',
            options: {
              targets: browsersList,
            },
          },
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: { not: [/react/] }, // exclude react component if *.svg?react
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: /react/, // *.svg?react
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new Dotenv({ prefix: 'import.meta.env.', systemvars: true }),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
      filename: './index.html',
      favicon: './public/favicon.svg',
    }),
    new rspack.CssExtractRspackPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

export default config;
