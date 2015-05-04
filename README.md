# baobab-hot-loader
Using Webpack hot replacement update your application state without reload

Watch a preview of the functionality on youtube: [Hot loading application state with Baobab and Webpack](https://www.youtube.com/watch?v=iVYF-_gjJGg).

## Features
- Hot loads changes to the Baobab tree
- Does a diff on changes so that any changes to state tree done through application code is not reset

## What does this mean?
Would it not be great to have a workflow where the browser never refreshes? Combine `baobab-hot-loader` with the `react-hot-loader` and `style-loader` and you are closing in on it.

## How to use
`npm install baobab-hot-loader` (SOON).

This is a typical configuration file. Note that you use the `react-hot-loader` before the `baboab-hot-loader`.

*webpack.config.js*
```js
var Webpack = require('webpack');
var path = require('path');
var appPath = path.resolve(__dirname, 'app');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');

var config = {
  context: __dirname,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080', 
    'webpack/hot/dev-server', 
    path.resolve(appPath, 'main.js')],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'react-hot!baobab-hot!babel?optional=es7.decorators',
      exclude: [nodeModulesPath]
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  },
  plugins: [new Webpack.HotModuleReplacementPlugin(), new Webpack.NoErrorsPlugin()]
};

module.exports = config;
```

The only requirement for this to work is that you put your state in its own file, something like:

*state.js*
```js
var state = {
  
};
modue.exports = state;
```

*tree.js*
```js
var Baobab = require('baobab');
var state = require('./state.js');
var tree = new Baobab(state);
module.exports = tree;
```

Now you are free to use your tree in any file and to changes to the `state.js` file.

Awaiting pull request https://github.com/Yomguithereal/baobab-react/pull/34 before release.