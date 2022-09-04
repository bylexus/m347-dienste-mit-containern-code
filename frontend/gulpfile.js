/**
 * gulp tasks for building html templates / scss / js.
 *
 * Usage:
 *
 * - gulp auto: compiles templates and scss/js, start webserver and watch files for changes
 * - gulp watch: compiles templates and scss/js, and watch files for changes. No web server started.
 * - gulp compileAll: compiles templates and scss/js to site folder
 */
const fs = require("fs");
const gulp = require("gulp");
const njkRender = require("gulp-nunjucks-render");
const sassRender = require("gulp-sass")(require("node-sass"));
const minify = require("gulp-minify");
const config = require("./config/config");
// const browserSync = require("browser-sync").create();
const bodyParser = require("body-parser");

function dirTask(cb) {
  if (!fs.existsSync(config.paths.public_dir)) {
    fs.mkdirSync(config.paths.public_dir);
    if (!fs.existsSync(config.paths.public_dir + "/css")) {
      fs.mkdirSync(config.paths.public_dir + "/css");
    }
    if (!fs.existsSync(config.paths.public_dir + "/js")) {
      fs.mkdirSync(config.paths.public_dir + "/js");
    }
  }
  cb();
}

// function browserSyncTask() {
//   browserSync.init({
//     server: {
//       baseDir: config.paths.public_dir,
//     },
//     port: config.server.port,
//     ui: { port: config.server.managementPort },
//     middleware: [
//       bodyParser.urlencoded(),
//       {
//         route: "/formular-input",
//         handle: function (req, resp, next) {
//           let data = JSON.stringify(req.body);
//           resp.write(`
// <!DOCTYPE html>
// <html>
//   <body>
//         <h1>Vielen Dank!</h1>
//         <p>Ihre Daten sind angekommen:</p>
//         <pre>${data}</pre>
//   </body>
// </html>
//         `);
//           resp.end();
//         },
//       },
//     ],
//   });
// }

function njkTask() {
  return gulp
    .src(config.paths.views_dir + "/**/*.@(html|njk)")
    .pipe(
      njkRender({
        path: [config.paths.src_dir],
        data: config.njk.templateVars,
      })
    )
    .pipe(gulp.dest(config.paths.public_dir));
}

function sassTask() {
  return gulp
    .src(config.paths.resources_dir + "/scss/**/*.scss")
    .pipe(
      sassRender({
        outputStyle: config.sass.outputStyle,
      })
    )
    .pipe(gulp.dest(config.paths.public_dir + "/css"));
}

function jsMinifyTask() {
  return gulp
    .src(config.paths.resources_dir + "/js/**/*.js")
    .pipe(
      minify({
        ext: {
          src: ".js",
          min: ".min.js",
        },
        noSource: config.js.doKeepSource,
        exclude: [config.paths.vendor_dir],
        ignoreFiles: [".min.js"],
      })
    )
    .pipe(gulp.dest(config.paths.public_dir + "/js"));
}

function jsTask() {
  return gulp
    .src(config.paths.resources_dir + "/js/**/*.js")
    .pipe(gulp.dest(config.paths.public_dir + "/js"));
}

function vendorJSTask() {
  return gulp
    .src(config.paths.vendor_dir + "/js/**/*.js")
    .pipe(gulp.dest(config.paths.public_dir + "/js"));
}

function vendorCSSTask() {
  return gulp
    .src(config.paths.vendor_dir + "/css/**/*.css")
    .pipe(gulp.dest(config.paths.public_dir + "/css"));
}

const compileAllTask = gulp.series(
  dirTask,
  njkTask,
  sassTask,
  config.js.doCompress ? jsMinifyTask : jsTask,
  vendorJSTask,
  vendorCSSTask
);

const watchTask = gulp.series(
  compileAllTask,
  gulp.parallel(
    () =>
      gulp.watch(
        [config.paths.src_dir + "/**/*.+(html|js|css|scss|njk)"],
        compileAllTask
      )
    // () =>
    //   gulp
    //     .watch(config.paths.public_dir + "/**/*")
    //     .on("change", browserSync.reload)
  )
);

module.exports = {
  default: gulp.series(compileAllTask),
  // auto: gulp.parallel([browserSyncTask, watchTask]),
  watch: watchTask,
  compileAll: compileAllTask,
};
