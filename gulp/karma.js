var karma = require('karma');

module.exports = function (done) {
  new karma.Server({
    singleRun: true,
    browsers: ['PhantomJS'],
    configFile: __dirname + '/../karma.conf.js'
  }, done).start();
};
