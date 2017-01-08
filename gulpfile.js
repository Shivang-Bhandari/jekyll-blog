var gulp        = require('gulp');
var cp          = require('child_process');
var browserSync = require('browser-sync').create();

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll', function(done) {
  browserSync.notify('Compiling Jekyll');
  var jekyll_command = ['exec', 'jekyll', 'build', '--watch'];
  return cp.spawn('bundle', jekyll_command, {
    stdio: 'inherit'
  }).on('close', done);
});

// gulp.task('jekyllServe', function(){
//   browserSync.notify('Compiling Jekyll');
//   var jekyll_command = ['exec', 'jekyll', 'serve', '--watch'];
//   return cp.spawn('bundle', jekyll_command, {
//     stdio: 'inherit'
//   }).on('close', done);
// });


gulp.task('serve', function() {
  browserSync.init({
       files: ['_site' + '/**'],
       port: 5000,
       server: {
         baseDir: '_site'
       }
     });

     gulp.watch("/static/css/blog.css", ['jekyll-rebuild']);
     gulp.watch("/*.html", ['jekyll-rebuild']);
     gulp.watch("/_layouts/*.html", ['jekyll-rebuild']);
     gulp.watch("/_includes/*.html", ['jekyll-rebuild']);
});

/**
 * Reload the Browser when the build is completed.
 */
gulp.task('jekyll-rebuild', ['jekyll'], function() {
  browserSync.reload();
});

gulp.task('default', ['jekyll', 'serve']);
