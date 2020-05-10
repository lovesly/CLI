const { src, dest } = require('gulp');
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const gulpif = require("gulp-if");

exports.main = function() {
    // 路径是相对于根目录？？
    return src("./examples/async.js")
            .pipe(babel({
                presets: ["@babel/preset-env"],
            }))
            .pipe(dest("output/"));
};

exports.rename = function () {
    return (
        src("./examples/async.js")
        .pipe(babel({
                presets: ["@babel/preset-env"],
            }))
        .pipe(src('vendor/*.js'))
        .pipe(dest('output/'))
        // gulp-uglify 插件并不改变文件名
        .pipe(uglify())
        // 因此使用 gulp-rename 插件修改文件的扩展名
        // gulp-if 进行条件判断，非常函数式有没有，我想看 gulp 以及 插件的源码。我要变强
        .pipe(gulpif(true, rename({ extname: ".min.js" })))
        .pipe(dest("output/"))
    );
};

exports.babel = function () {
    return src("src/*.js").pipe(babel()).pipe(dest("output/"));
};