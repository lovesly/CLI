const { parallel } = require('gulp');

function build(cb) {
  cb();
}

function compile(cb) {
  cb();
}

exports.build = parallel(build, compile);