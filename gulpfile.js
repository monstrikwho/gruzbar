/* Структура папок
 *  _______________________________
 *  | - dist                       |
 *      | - styles                 |
 *          | - minify             |
 *          | - sass               |
 *              | - partials       |
 *      | - fonts                  |
 *      | - images                 |
 *      | - scripts                |
 *      | - lib                    |
 *  | - build                      |
 *  | - node_modules               |
 *_________________________________|
 */

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

// -------------------------------------------------------------------------------
// Компиляция sass в css и минификация
// -------------------------------------------------------------------------------
gulp.task("sass", function () {
  return gulp
    .src("dist/styles/sass/**/*.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ overrideBrowserslist: ["last 2 versions"] }))
    .pipe(gulp.dest("dist/styles/css/"))
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min",
        extname: ".css",
      })
    )
    .pipe(gulp.dest("dist/styles/minify/"));
});

// -------------------------------------------------------------------------------
// Минификация JS
// -------------------------------------------------------------------------------
gulp.task("scripts", function () {
  return gulp
    .src("dist/scripts/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min", extname: ".js" }))
    .pipe(gulp.dest("dist/scripts/minify/"));
});

// -------------------------------------------------------------------------------
// Наблюдение за имзенениями sass и js файлов
// -------------------------------------------------------------------------------
gulp.task("watch", function () {
  gulp.watch("dist/styles/sass/**/*.sass", gulp.series("sass"));
  gulp.watch("dist/scripts/*.js", gulp.series("scripts"));
});

// -------------------------------------------------------------------------------
// Default task
// -------------------------------------------------------------------------------
gulp.task("default", gulp.series("watch"));
