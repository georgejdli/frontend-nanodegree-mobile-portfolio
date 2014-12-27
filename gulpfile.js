/*globals require */
// Include gulp
var gulp = require('gulp');

// Define base folders
var src = 'views/';
var dest = 'views/';

// Include plugins
var $ = require('gulp-load-plugins')();
var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    psi = require('psi'),
    ngrok = require('ngrok'),
    critical = require('critical');
//vars for PSI with local server using ngrok
var url = 'http://7d9f7a92.ngrok.com/views/pizza.html';
var key = '';

//remove unused CSS
gulp.task('uncss', function() {
    return gulp.src(src + 'css/bootstrap-grid.css')
        .pipe($.uncss({
            html: [src + 'pizza.html']
        }))
        .pipe(rename({suffix: '.un'}))
        .pipe(gulp.dest(dest + 'css'));
});

//Minify HTML
gulp.task('html', function() {
    var opts = {comments: 'false', spare: 'true'};
    return gulp.src(src + 'pizza.html')
        .pipe($.minifyHtml(opts))
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(dest));
});

//Concatenate & Minify CSS
gulp.task('css', function() {
    return gulp.src(src + 'css/bootstrap-grid.un.css')
        //.pipe(concat('main.css'))
        //.pipe(gulp.dest(dest + 'css'))
        .pipe(rename({suffix: '.min'}))
        .pipe($.csso())
        .pipe(gulp.dest(dest + 'css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(src + 'js/main.js')
      //.pipe(plumber())
      //.pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(dest + 'js'));
        //.pipe(livereload());
});

// Image Optimization
gulp.task('images', function() {
    return gulp.src(src + 'images/*.*')
      .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
      .pipe(gulp.dest(dest + 'images'));
});

//PSI with local server using ngrok


gulp.task('ngrok', function() {
    ngrok.connect({
        authtoken: 'oRyKiIBrrZJRk0kQJJ4O',
        //httpauth: 'login:password',
        port: 8080
        }, function (err, url) {
        if (err !== null) {
            console.log( err );
        }
    });
});

gulp.task('mobile', ['ngrok'], function () {
        return psi({
            key: 'AIzaSyA7m8q-WOgCphlzb4s7i0TVPugZCpah_6M',
            //nokey: 'true',
            url: url,
            strategy: 'mobile',
        });
});

gulp.task('desktop', ['ngrok'], function () {
        return psi({
            key: 'AIzaSyA7m8q-WOgCphlzb4s7i0TVPugZCpah_6M',
            //nokey: 'true',
            url: url,
            strategy: 'desktop',
        });
});

//generate critical css for above the fold
gulp.task('critical', function () {
    critical.generateInline({
        // Your base directory
        base: 'views/dist/',

        // HTML source
        //html: '<html>...</html>',

        // HTML source file
        src: 'views/pizza.html',

        // Your CSS Files (optional)
        css: [src + 'views/css/style.css','views/css/bootstrap-grid.css'],

        // Viewport width
        width: 320,

        // Viewport height
        height: 480,

        // Target for final HTML output
        htmlTarget: 'pizza.html',

        // Target for generated critical-path CSS (which we inline)
        styleTarget: 'css/main.css',

        // Minify critical-path CSS when inlining
        minify: false,

        // Extract inlined styles from referenced stylesheets
        extract: true
    });
});

// Watch for changes in files
gulp.task('watch', function() {

    var server = livereload();

    // Watch .js files
    gulp.watch(src + 'js/*.js', ['scripts']);

    // Watch .scss files
    gulp.watch(src + 'scss/*.scss', ['sass']);

    // Watch image files
    gulp.watch(src + 'images/**/*', ['images']);

});

// Default Task
gulp.task('default', ['scripts']);