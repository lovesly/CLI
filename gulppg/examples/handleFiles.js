const { src, dest } = require('gulp');
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

exports.main = function() {
    // 路径是相对于根目录？？
    return src("./examples/async.js")
            .pipe(babel({
                presets: ["@babel/preset-env"],
            }))
            .pipe(dest("output/"));
};

exports.babel = function () {
    return src("src/*.js").pipe(babel()).pipe(dest("output/"));
};