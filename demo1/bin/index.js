#!/usr/bin/env node
// need to run 'npm link', npm link 作用主要是，在开发 npm 模块的时候，我们会希望边开发边调试。恩？
// 这篇文章写得挺垃圾的，没有上下文，没头没尾的。

const { program } = require('commander');

program.version('0.0.1', '-v, --version');
// 这命令和下面有冲突啊，加上下面就不显示了我靠
// 不是很理解这个运行机制？

// command 和 subsommand，以及什么时候会调用其他文件？整体应该是什么结构呢？感觉一些命令会相互冲突。
// program.command('init <dir>', 'generate a new project');

program.option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza')
  .option('--no-sauce', 'Remove sauce')
  // 这里有点问题，requiredOption 和 option 区别，option 你可以不输入，requiredOption 必须带这个参数
  .option('-c, --cheese <flavour>', 'cheese flavour', 'mozzarella') // default param
  // .option('-c, --cheese [type]', 'Add cheese with optional type') // optional param value
  .option('--no-cheese', 'plain with no cheese')
  .parse(process.argv);

// ================ info ================= //
const sauceStr = program.sauce ? 'sauce' : 'no sauce';
const cheeseStr = (program.cheese === false) ? 'no cheese' : `${program.cheese} cheese`;
console.log(`You ordered a pizza with ${sauceStr} and ${cheeseStr}`);

if (program.cheese === undefined) console.log('no cheese');
else if (program.cheese === true) console.log('add cheese');
else console.log(`add cheese type ${program.cheese}`);

if (program.debug) {
  console.log(program.opts());
}
console.log('pizza details:')
if (program.small) console.log('- small pizza size');
if (program.pizzaType) console.log(`- ${program.pizzaType}`);
console.log(`cheese: ${program.cheese}`);

// ===================== command =================== //
program
  .command('setup [env]')
  .description('run setup commands for all envs')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(env, options){
    const mode = options.setup_mode || "normal";
    env = env || 'all';
    console.log('setup for %s env(s) with %s mode', env, mode);
  });

// what? can't chain this shit?
program.parse(process.argv);