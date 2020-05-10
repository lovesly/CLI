const { series } = require('gulp');
// cmd, 怎么同时引入 default, 和其他具名函数来着？？
const {
  babel,
  main,
  rename,
} = require("./examples/handleFiles.js");

const { inlinePlugin } = require('./examples/inline-plugin');
const { watchJS } = require('./examples/watch');

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
// 如果其他文件夹里的，怎么统一导出呢？
exports.bundle = bundle;
exports.main = main;
exports.babel = babel;
exports.rename = rename;
exports.inlinePlugin = inlinePlugin;
exports.watchJS = watchJS;

// 可以条件判断，wow
if (process.env.NODE_ENV === 'production') {
  exports.build = series(minify, bundle);
} else {
  exports.build = series(transpile, bundle);
}
