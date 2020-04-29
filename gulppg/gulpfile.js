const { series } = require('gulp');

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

// 可以条件判断，wow
if (process.env.NODE_ENV === 'production') {
  exports.build = series(minify, bundle);
} else {
  exports.build = series(transpile, bundle);
}
