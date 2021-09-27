/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

/*
This line is only required if you are specifying `TS_NODE_PROJECT` for whatever reason.
 */
// delete process.env.TS_NODE_PROJECT;

/** @type {import ('@types/webpack').Configuration} */
const config = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal
    ? 'eval-cheap-module-source-map'
    : 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.paths.json',
      }),
    ],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  optimization: {
    concatenateModules: false,
  },
  target: 'node14.17',
  externals: [nodeExternals()],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(
            __dirname,
            'src',
            'framework',
            'services',
            'mail',
            'views'
          ),
          to: path.resolve(
            __dirname,
            '.webpack',
            'service',
            'src',
            'framework',
            'services',
            'mail',
            'views'
          ),
        },
      ],
    }),
  ],
  stats: {
    warningsFilter: /export .* was not found in/,
  },
}

module.exports = config
