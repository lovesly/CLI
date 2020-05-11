const { src, dest } = require('gulp');
const babel = require("gulp-babel"); 
const uglify = require('gulp-uglify');

// 内联资源映射
function copy() {
    return src('methods/*.js', { sourcemaps: true })
        .pipe(babel({
            presets: ["@babel/preset-env"],
        }))
        .pipe(uglify())
        .pipe(dest('output2/', { sourcemaps: true }));
}
// 外部资源映射
function copyExternal() {
    return src('methods/*.js', { sourcemaps: true })
        .pipe(babel({
            presets: ["@babel/preset-env"],
        }))
        .pipe(uglify())
        .pipe(dest('output2/', { sourcemaps: '.'}));
}

exports.copy = copy;
exports.copyExternal = copyExternal;

// 可配置项也太多了，30 个卧槽

// 资源映射？