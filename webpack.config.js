module.exports = {
  entry: [
    "./app.js"
  ],

  output: {
    path: __dirname,
    filename: "bundle.js",

    // export the bundle as a CommonJS module
    // http://webpack.github.io/docs/configuration.html#output-librarytarget
    libraryTarget: 'commonjs'
  },

  // do not touch native Node modules (e.g. fs)
  // http://webpack.github.io/docs/configuration.html#target
  target: 'node',

  externals: {
    // define newrelic as an external library
    // http://webpack.github.io/docs/configuration.html#externals
    newrelic: true
  }
}