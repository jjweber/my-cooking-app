const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify');
const htmlreplace = require('gulp-html-replace');

gulp.task("default", function () {
    gulp.src("./src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat("all.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"));
    gulp.src('./src/css/*')
        .pipe(gulp.dest('./dist/css'));
    gulp.src('./src/js/*.json')
        .pipe(gulp.dest('dist/js'));
    gulp.src('*.html')
        .pipe(htmlreplace({'devincludes': ''}))
        .pipe(gulp.dest('dist'));
});

gulp.task('scss', function() {

    let processors = [
        autoprefixer({ browsers: ['last 2 versions']}),
    ];
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({
            stream:true
        }))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
});

gulp.task('watch', ['browser-sync', 'scss'], function() {
    gulp.watch('./src/scss/**/*.scss', ['scss'])
    gulp.watch('./*.html').on('change', browserSync.reload);
});
