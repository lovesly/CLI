"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('gulp'),
    src = _require.src,
    dest = _require.dest;

var _require2 = require('events'),
    EventEmitter = _require2.EventEmitter;

var _require3 = require('child_process'),
    exec = _require3.exec;

var fs = require('fs');

function streamTask() {
  return src('*.js').pipe(dest('output'));
}

function PromiseTask() {
  return Promise.resolve('Value is resolved!');
}

function eventEmitterTask() {
  var emitter = new EventEmitter();
  setTimeout(function () {
    emitter.emit('finish');
  }, 250);
  return emitter;
}

function childProcessTask() {
  return exec('data');
} // rxjs, observable. weird...
// callback


function callbackTask(cb) {
  cb();
}

function passingCallback(cb) {
  fs.access('gulpfile.js', cb);
} // 不再支持同步task？ 如果不适用上面的方式，可以用 async 来？ 使用promise 来包装任务？？


function asyncAwaitTask() {
  return _asyncAwaitTask.apply(this, arguments);
}

function _asyncAwaitTask() {
  _asyncAwaitTask = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _fs$readFileSync, version;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _fs$readFileSync = fs.readFileSync('package.json'), version = _fs$readFileSync.version;
            _context.next = 3;
            return Promise.resolve('some result');

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _asyncAwaitTask.apply(this, arguments);
}