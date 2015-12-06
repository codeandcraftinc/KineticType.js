var gulp = require('gulp');
var gutil = require('gulp-util');
var chalk = gutil.colors;
var gls = require('gulp-live-server');

module.exports = function () {
  var server = gls.new('examples/server.js');

  gutil.log(chalk.yellow('starting server...'));
  server.start();
  gutil.log(chalk.green('server started'));

  gulp.watch('examples/server.js', function () {
    gutil.log(chalk.yellow('restarting server...'));
    server.start.bind(server)();
    gutil.log(chalk.green('server restarted'));
  });

  gulp.watch(['.tmp/**/*.css', '.tmp/**/*.js'], function (file) {
    server.notify.apply(server, [file]);
  });
};
