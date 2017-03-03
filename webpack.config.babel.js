import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import path from 'path';

module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'js/[name].[hash].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    root: path.resolve('./src'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, '/src/sass'),
      },
      {
        include: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /weather-icons[\/\\]font[\/\\].*\.(woff2?|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /weather-icons[\/\\]font[\/\\].*\.(ttf|eot)$/,
        loader: 'file',
        query: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      title: 'My React App',
    }),
    new CleanWebpackPlugin(['./dist'], {
      // Without `root` CleanWebpackPlugin won't point to our
      // project and will fail to work.
      root: process.cwd(),
      verbose: true,
      dry: false,
    }),
  ],
};