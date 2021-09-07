"use strict";

const gulp        = require("gulp");
const concat      = require("gulp-concat");
const uglify      = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const TestServer  = require("karma").Server;
const preprocess  = require("gulp-preprocess");
const minimist    = require("minimist");
const eslint      = require("gulp-eslint");

const options = minimist(process.argv.slice(2), {
    "string": ["env", "distPath"],
    "default": {
        "env": "dev",
        "distPath": "dist"
    }
});

/**
 * @description ESLintを実行
 * @public
 */
function lint ()
{
    return gulp
        .src("src/**/*.js")
        .pipe(eslint({ "useEslintrc": true }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
}

/**
 * @description JavaScriptをまとめてminifyして出力
 * @public
 */
function buildJavaScript()
{
    // setup
    const preprocessContext = {};

    preprocessContext.DEBUG = options.env !== "prd";

    const build = gulp
        .src([
            "Header.file",
            "src/**/*.js",
            "Footer.file"
        ])
        .pipe(concat("app.js"))
        .pipe(preprocess({ "context": preprocessContext }));

    if (options.env === "prd") {
        build
            .pipe(uglify({ "output": { "comments": /^!/ } }));
    }

    return build
        .pipe(gulp.dest(options.distPath));
}

/**
 * @description local serverを起動
 * @return {void}
 * @public
 */
function browser (done)
{
    browserSync.init({
        "server": {
            "baseDir": "dist",
            "index": "index.html"
        },
        "reloadOnRestart": true
    });
    done();
}

/**
 * @description local serverを再読込
 * @return {void}
 * @public
 */
function reload (done)
{
    browserSync.reload();
    done();
}

/**
 * @description ファイルを監視、変更があればビルドしてlocal serverを再読込
 * @public
 */
function watchFiles ()
{
    return gulp
        .watch("src/**/*.js")
        .on("change", gulp.series(
            buildJavaScript,
            reload
        ));
}

/**
 * @description テストを実行
 * @public
 */
function test (done)
{
    new TestServer({
        "configFile": __dirname + "/karma.conf.js",
        "singleRun": true
    }, function (error)
    {
        console.log(error);
        done();
    }).start();
}

exports.default = gulp.series(
    buildJavaScript,
    browser,
    watchFiles
);
exports.test  = gulp.series(test);
exports.lint  = gulp.series(lint);
