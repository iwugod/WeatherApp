var path = require('path');
var webpack = require('webpack');


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

  // optimization: {
  //    splitChunks: {
  //      chunks: 'all'
  //    }
  // },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

 resolve: {
    extensions: ['.js', 'scss', 'sass', 'css']
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
      use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
     }
    ]
  }

};