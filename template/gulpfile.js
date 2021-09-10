"use strict";

const gulp        = require("gulp");
const concat      = require("gulp-concat");
const uglify      = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const TestServer  = require("karma").Server;
const preprocess  = require("gulp-preprocess");
const minimist    = require("minimist");
const eslint      = require("gulp-eslint");
const fs          = require("fs");
const os          = require("os");
const glob        = require("glob");

const options = minimist(process.argv.slice(2), {
    "string": ["env", "distPath"],
    "default": {
        "env": "dev",
        "distPath": `${__dirname}/dist`
    }
});

/**
 * @description ESLintを実行
 * @public
 */
function lint ()
{
    return gulp
        .src(`${__dirname}/src/**/*.js`)
        .pipe(eslint({ "useEslintrc": true }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
}

/**
 * @description config
 * @public
 */
function buildConfig (done)
{

    const config = {
        "stage": {},
        "routing": {}
    };

    const envJson = JSON.parse(
        fs.readFileSync(`${__dirname}/src/config/config.json`, { "encoding": "utf8" })
    );
    const stageJson = JSON.parse(
        fs.readFileSync(`${__dirname}/src/config/stage.json`, { "encoding": "utf8" })
    );
    const routingJson = JSON.parse(
        fs.readFileSync(`${__dirname}/src/config/routing.json`, { "encoding": "utf8" })
    );

    Object.assign(config, envJson[options.env]);
    Object.assign(config, envJson.all);
    Object.assign(config.stage, stageJson);
    Object.assign(config.routing, routingJson);

    fs.writeFileSync(
        `${__dirname}/src/Config.file`,
        "next2d.fw.config = " + JSON.stringify(config, null, 2) + ";" + os.EOL
    );

    glob(`${__dirname}/src/**/*.js`, (err, files) =>
    {
        if (err) {
            throw err;
        }

        let packages = "[";
        files.forEach((file) =>
        {
            const js = fs.readFileSync(file, { "encoding": "utf-8" });
            const lines = js.split("\n");

            lines.forEach((line) =>
            {
                if (line.startsWith("class ")) {
                    const name = line.split(" ")[1];
                    packages += `["${name}", ${name}],`;
                    return true;
                }
            });
        });

        packages = packages.slice(0, -1);
        packages += "]";

        fs.writeFileSync(
            `${__dirname}/src/Packages.file`,
            `next2d.fw.packages = new Map(${packages});`
        );

        done();
    });
}

/**
 * @description JavaScriptをまとめてminifyして出力
 * @public
 */
function buildJavaScript ()
{

    const build = gulp
        .src([
            `${__dirname}/node_modules/@next2d/player/next2d.js`,
            `${__dirname}/node_modules/@next2d/framework/next2d-framework.js`,
            `${__dirname}/src/Header.file`,
            `${__dirname}/src/Config.file`,
            `${__dirname}/src/**/*.js`,
            `${__dirname}/src/Packages.file`,
            `${__dirname}/src/Footer.file`
        ])
        .pipe(concat("app.js"))
        .pipe(preprocess({ "context": { "DEBUG": options.env !== "prd" } }));

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
            "baseDir": [
                `${__dirname}/mock`,
                `${__dirname}/dist`
            ],
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
        .watch([
            `${__dirname}/node_modules/@next2d/player/next2d.js`,
            `${__dirname}/node_modules/@next2d/framework/next2d-framework.js`,
            `${__dirname}/src/**/*.js*`
        ])
        .on("change", gulp.series(
            buildConfig,
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
        "configFile": `${__dirname}/karma.conf.js`,
        "singleRun": true
    }, function (error)
    {
        console.log(error);
        done();
    }).start();
}

exports.default = gulp.series(
    buildConfig,
    buildJavaScript,
    browser,
    watchFiles
);
exports.build = gulp.series(buildConfig, buildJavaScript);
exports.test  = gulp.series(test);
exports.lint  = gulp.series(lint);
