var gulp = require('gulp'),
              livereload = require('gulp-livereload'),
              open = require('gulp-open');

        /* Watch 
        ================================= */
        gulp.task('html', function () {
            gulp.src('/home/asmcoder/vsCode/ServerRoot/**/*.html').pipe(livereload({ start: true }));
        });

        gulp.task('css', function () {
            gulp.src('/home/asmcoder/vsCode/ServerRoot/**/*.css').pipe(livereload({ start: true }));
        });

        gulp.task('js', function () {
            gulp.src('/home/asmcoder/vsCode/ServerRoot/**/*.js').pipe(livereload({ start: true }));
        });

        gulp.task('php', function () {
            gulp.src('/home/asmcoder/vsCode/ServerRoot/**/*.php').pipe(livereload({ start: true }));
        });

        gulp.task('watch', function(){
          livereload.listen();
            gulp.watch(['/home/asmcoder/vsCode/ServerRoot/**/*.html'],['html']);
            gulp.watch(['/home/asmcoder/vsCode/ServerRoot/**/*.css'],['css']);
            gulp.watch(['/home/asmcoder/vsCode/ServerRoot/**/*.js'],['js']);
            gulp.watch(['/home/asmcoder/vsCode/ServerRoot/**/*.php'],['php']);
        });

        /* Open Browser 
        ================================= */
        gulp.task('uri', function(){
          gulp.src(__filename)
          .pipe(open({uri: 'http://localhost/Etch-A-Sketch/index.html'}));
        });
        /* you can use localhost or ip address
        ================================= */

        gulp.task('serve', [ 'watch', 'uri' ]);
        gulp.task('default', [ 'serve']);
