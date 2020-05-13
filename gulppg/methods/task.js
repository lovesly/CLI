const { taskh, registry } = require('gulp')
const FwdRef = require('undertaker-forward-reference');

function buildT1(cb) {
    cb()
}
task(buildT1)

task('buildT2', function(cb) {
    cb();
})

// retrieve a task
const buildT2 = task('buildT2');

// registry
// 真几把抽象。。。
registry(FwdRef());


exports.buildT2 = buildT2;