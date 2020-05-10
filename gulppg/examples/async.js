const { src, dest } = require('gulp');
const { EventEmitter } = require('events');
const { exec } = require('child_process');
const fs = require('fs');

function streamTask() {
    return src('*.js').pipe(dest('output'));
}

function PromiseTask() {
    return Promise.resolve('Value is resolved!');
}

function eventEmitterTask() {
    const emitter = new EventEmitter();
    setTimeout(() => {
        emitter.emit('finish')
    }, 250);
    return emitter;
}

function childProcessTask() {
    return exec('data');
}

// rxjs, observable. weird...

// callback
function callbackTask(cb) {
    console.log('do something')
    cb();
}

function passingCallback(cb) {
    fs.access('gulpfile.js', cb);
}

// 不再支持同步task？ 如果不适用上面的方式，可以用 async 来？ 使用promise 来包装任务？？
async function asyncAwaitTask() {
    const { version } = fs.readFileSync('package.json');
    await Promise.resolve('some result');
}



