var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var mainBower = require('main-bower-files');
var inject = require('gulp-inject');
var gulpFilter = require('gulp-filter');

/**
 * Inject dependencies into include files
 */

// Collects sources target
var sources = gulp.src(['includes/js-imports.inc']);

// Collects dependencies to inject
var depInject = gulp.src(mainBower(), { base: 'bower_components/', read: false })
    .pipe(gulpFilter('**/*.js'));

// Collects application js files to inject
var appInject = gulp.src('app/**/*.js', { read: false });

gulp.task('inject', function() {
    return sources.pipe(inject(
        depInject, {name: 'bower'}
    ))
    .pipe(inject(appInject))
    .pipe(gulp.dest('includes/'));
});
/* Inject end */


/**
 * Deploy script
 */
gulp.task('deploy', function() {
    console.log("Not yet implemented");
});