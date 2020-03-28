#!/usr/bin/env node
// need to run 'npm link', npm link 作用主要是，在开发 npm 模块的时候，我们会希望边开发边调试。恩？
// 这篇文章写得挺垃圾的，没有上下文，没头没尾的。

const program = require('commander');

program.version('1.0.0', '-v, --version')
      .command('init <dir>', 'generate a new project')
      .parse(process.argv);
