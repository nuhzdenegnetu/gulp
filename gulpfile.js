const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const replace = require('gulp-replace');
const mediaQuery = require('gulp-group-css-media-queries');

// File paths
const paths = {
    html: {
        src: './*.html',
        dest: './'
    },
    styles: {
        src: './src/scss/**/*.scss',
        dest: './assets/css/'
    },
};

// Compile SCSS to CSS, add vendor prefixes, and create sourcemaps
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            silenceDeprecations: ['legacy-js-api']
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        // Исправляем пути к изображениям
        .pipe(replace(/url\([\.\.\/]+gulp\/assets\/images\//g, 'url(../images/'))
        // Группируем медиа-запросы
        .pipe(mediaQuery())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

// Minify CSS files
function minifyCss() {
    return gulp.src(`${paths.styles.dest}*.css`)
        .pipe(cleanCSS({
            level: {
                1: {
                    specialComments: 0
                },
                2: {
                    all: true
                }
            }
        }))
        // Убираем переименование и просто перезаписываем исходный файл
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

// Start BrowserSync server
function serve() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        notify: false
    });

    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.html.src).on('change', browserSync.reload);
}


// Build task (для production)
const build = gulp.series(styles, minifyCss);

// Dev task (для разработки без минификации)
const dev = gulp.series(styles, serve);

// Export tasks
exports.styles = styles;
exports.minifyCss = minifyCss;
exports.serve = serve;
exports.build = build;
exports.default = dev;