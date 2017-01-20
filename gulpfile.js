var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var mainBower = require('main-bower-files');
var inject = require('gulp-inject');
var gulpFilter = require('gulp-filter');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sync = require('gulp-sync')(gulp);
var templateCache = require('gulp-angular-templatecache');
var minifyHTML = require('gulp-minify-html');

/**
 * Inject dependencies during development
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

// Inject js files into html
gulp.task('injectJs', function () {

    var jsApp = gulp.src(appJsFiles, { read: false });

    return gulp.src('index.html')
        .pipe(inject(depJs, { name: 'vendor' }))
        .pipe(inject(jsApp))
        .pipe(gulp.dest('./'));
});

// Inject css files into html
gulp.task('injectCss', function () {

    var cssApp = gulp.src('public/style/**/*.css', { read: false });

    return gulp.src('index.html')
        .pipe(inject(depCss, { name: 'vendor' }))
        .pipe(inject(cssApp))
        .pipe(gulp.dest('./'));
});

// Inject task chain
gulp.task('inject', ['injectJs', 'injectCss']);

/* Inject end */


/**
 * Build deploy dist
 */

// Files compression
gulp.task('compress', function () {
    return Promise.all([
        new Promise(function (resolve, reject) {
            gulp.src(appJsFiles)
                .pipe(concat('app.js'))
                .pipe(uglify())
                .on('error', reject)
                .pipe(gulp.dest('dist/'))
                .on('end', resolve);
        }),
        new Promise(function (resolve, reject) {
            gulp.src(mainBower()).pipe(gulpFilter('**/*.js'))
                .pipe(concat('vendor.js'))
                .pipe(uglify())
                .on('error', reject)
                .pipe(gulp.dest('dist/'))
                .on('end', resolve);
        }),
        new Promise(function (resolve, reject) {
            gulp.src('public/style/**/*.css')
                .pipe(concat('style.css'))
                .on('error', reject)
                .pipe(gulp.dest('dist/'))
                .on('end', resolve);
        }),
        new Promise(function (resolve, reject) {
            gulp.src(mainBower()).pipe(gulpFilter('**/*.css'))
                .pipe(concat('vendor.css'))
                .on('error', reject)
                .pipe(gulp.dest('dist/'))
                .on('end', resolve);
        })
    ]).then(function () {
        console.log('compression end');
    });
});

// Clean the dist folder
gulp.task('clean', function () {
    return gulp.src('dist/**/*.*')
        .pipe(rimraf());
});

// Inject the minified application files into html
gulp.task('inject-app-build', function () {
    return gulp.src('index.html')
        .pipe(inject(gulp.src(['dist/app.js', 'dist/templates.js', 'dist/style.css'], { read: false })))
        .pipe(gulp.dest('dist/'));
});

// Inject the minified vendor files into html
gulp.task('inject-vendor-build', function () {
    return gulp.src('index.html')
        .pipe(inject(gulp.src(['dist/vendor.js', 'dist/vendor.css'], { read: false }), { name: 'vendor' }))
        .pipe(gulp.dest('dist/'));
});

//Compression of the html application files
gulp.task('template', function() {
    return gulp.src('app/**/*.html')
        .pipe(minifyHTML({
            empty: true,
            loose: true
        }))
        .pipe(templateCache({
            module: 'project.templates',
            standalone: true,
            root: '/app/'
        }))
        .pipe(gulp.dest('dist/'));
});

// Build task chain
gulp.task('build', sync.sync(['clean', 'compress', 'template', 'inject-app-build', 'inject-vendor-build']));

/* Build deploy end */


/**
 * Watch for changes during development
 */
gulp.task('watch', function () {
    watch(['app/**/*.js'], {verbose: true}, function () {
        gulp.start('injectJs');
    });
    watch(['public/style/**/*.css'], {verbose: true}, function () {
        gulp.start('injectCss');
    });
});