const { src, dest } = require('gulp');
const babel = require("gulp-babel");
const uglify = require('uglify-js');
const through2 = require('through2');

// 真他妈醉了，gulp 官方的例子报错，搞屁啊
// 1. 要加入 babel，否则 uglify 不认识 const 语法
// 2. uglify.minify 返回的是一个对象，Buffer.from 不接受普通对象，其实是写错了
// 应该是 const { code } = uglify.minify(...)
exports.inlinePlugin = function() {
    return src('examples/*.js')
        // 创建一个内联插件，从而避免使用 gulp-uglify 插件
        .pipe(babel({
            presets: ["@babel/preset-env"],
        }))
        .pipe(through2.obj(function(file, _, cb) {
        if (file.isBuffer()) {
            const { code } = uglify.minify(file.contents.toString())
            file.contents = Buffer.from(code)
        }
        cb(null, file);
        }))
        .pipe(dest('output/'));
}