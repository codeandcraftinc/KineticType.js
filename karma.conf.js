module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      // 'node_modules/phantomjs-polyfill/bind-polyfill.js',
      // 'node_modules/jquery/dist/jquery.js',
      'dist/kinetic-type.js',
      'test/client/**/*.js',
      'test/client/*.html'
    ],
    preprocessors: {
      'test/client/*.html': ['html2js']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Safari'],
    singleRun: false,
    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    }
  })
};
