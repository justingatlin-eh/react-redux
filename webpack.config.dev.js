import webpack from 'webpack';
import path from 'path';

//Node's __dirname variable

export default {
  debug: true, //Enables displaying debug information
  devtool: 'inline-source-map', //'cheap-module-eval-source-map'
  noInfo: false, //Webpack will display all the files that it is bundling
  entry: [ //Define entrypoints for the application
    'eventsource-polyfill', // Necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //Note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index') //Order is important... Must be last //Extension is implied //Used the imported path module
  ],
  target: 'web', // Could target Node. 'web' means it bundles for web output in a browser
  output: { //Won't actual write file.  Builds them in memory and serves to the browser
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src') //Tell webpack dev server where code is
  },
  plugins: [ //Plugins to enhance webpack's power
    new webpack.HotModuleReplacementPlugin(), //Replace modules without the need for a full browser refresh
    new webpack.NoErrorsPlugin() // Prevents errors from breaking hot-reloading experience.  Will print errors
  ],
  module: { //Tell webpack what type of files we want it to handle
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']}, //Use babel to transpile the code
      {test: /(\.css)$/, loaders: ['style', 'css']}, //Handles css.  Can also handle sass, less, etc.
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}, //Useful for bootstrap
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};
