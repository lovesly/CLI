const { series } = require('gulp');
// cmd, 怎么同时引入 default, 和其他具名函数来着？？
const { babel, main } = require('./examples/handleFiles.js');

function minify(cb) {
  cb();
}

function transpile(cb) {
  cb();
}

function bundle(cb) {
  cb();
}

// 可以分别导出
exports.bundle = bundle;
exports.main = main;
exports.babel = babel;
// 可以条件判断，wow
if (process.env.NODE_ENV === 'production') {
  exports.build = series(minify, bundle);
} else {
  exports.build = series(transpile, bundle);
}
