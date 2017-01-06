const gulp=require('gulp');
const child = require('child_process');
const gutil = require('gulp-util');

const browserSync = require('browser-sync').create();
const siteRoot = '_site';

gulp.task('jekyllServe', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});


gulp.task('browserSync', () => {
   browserSync.init({
     files: [siteRoot + '/**'],
     port: 4000,
     server: {
       baseDir: siteRoot
     }
   });
  gulp.watch();
 });

gulp.task('default', ['jekyllServe', 'browserSync']);
