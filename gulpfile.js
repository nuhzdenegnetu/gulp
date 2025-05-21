const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');

// File paths
const paths = {
    html: {
        src: './*.html',
        dest: './'
    },
    styles: {
        src: './src/scss/**/*.scss',
        dest: './dist/css/'
    },
    scripts: {
        src: './src/js/**/*.js',
        dest: './dist/js/'
    }
};

// Compile SCSS to CSS, add vendor prefixes, and create sourcemaps
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

// Minify CSS files
function minifyCss() {
    return gulp.src(`${paths.styles.dest}*.css`)
        .pipe(cleanCSS({
            compatibility: 'ie11',
            level: {
                1: {
                    specialComments: 0
                }
            }
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

// Copy and process JavaScript files
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(gulp.dest(paths.scripts.dest))
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
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.html.src).on('change', browserSync.reload);
}

// Build task
const build = gulp.series(styles, minifyCss, scripts);

// Dev task with watch
const dev = gulp.series(build, serve);

// Export tasks
exports.styles = styles;
exports.minifyCss = minifyCss;
exports.scripts = scripts;
exports.serve = serve;
exports.build = build;
exports.default = dev;