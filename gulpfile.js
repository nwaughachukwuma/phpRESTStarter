var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var mainBower = require('main-bower-files');
var inject = require('gulp-inject');
var gulpFilter = require('gulp-filter');
var watch = require('gulp-watch');

/**
 * Inject dependencies 
 */

// Collects dependencies to inject
var dependencies = gulp.src(mainBower(), { read: false });
var depJs = dependencies.pipe(gulpFilter('**/*.js'));
var depCss = dependencies.pipe(gulpFilter('**/*.css'));

// Collects application js files to inject
var appJsFiles = [
    'app/**/*.module.js',
    'app/**/*.js'
];

gulp.task('injectJs', function() {
    
    var jsApp = gulp.src(appJsFiles, { read: false });

    return gulp.src('includes/js-imports.inc')
    .pipe(inject(depJs, {name: 'bower'}))
    .pipe(inject(jsApp))
    .pipe(gulp.dest('includes/'));
});

gulp.task('injectCss', function() {

    var cssApp = gulp.src('public/style/**/*.css', { read: false });

    return gulp.src('includes/meta-imports.inc')
    .pipe(inject(depCss, {name: 'bower'}))
    .pipe(inject(cssApp))
    .pipe(gulp.dest('includes/'));
});

/**
 * Inject
 */
gulp.task('inject', ['injectJs', 'injectCss']);

/* Inject end */


/**
 * Build script
 */
gulp.task('build', function() {
    console.log("Not yet implemented");
});


/**
 * Watch for changes
 */
gulp.task('watch', function() {
    watch(['app/**/*.js'], function() {
        gulp.start('injectJs');
    });
    watch(['public/style/**/*.css'], function() {
        gulp.start('injectCss');
    });
});