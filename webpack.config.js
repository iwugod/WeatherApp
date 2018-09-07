var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

  module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
     './client/frontpage/frontPage.js'
    ],
    output: {
    path: path.join(__dirname,'/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
    devServer: {
      historyApiFallback: true
    },

 
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

 resolve: {
    extensions: ['.webpack.js', '.web.js', '.jsx', '.js', '.scss', '.css', '.eot', '.svg', '.ttf', '.woff']
  },
  module: {
    rules: [
      { test: /\.js$/,
        loader: "babel-loader",
        options: { presets: ['react', 'es2015'] },
         exclude: '/node_modules/'
       },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            }
        }]
    }
    
    ]
  }

};