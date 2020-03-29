#!/usr/bin/env node

// what's the difference between shelljs and commander??
const shell = require('shelljs'); // run script
const { program } = require('commander'); // cli
const inquirer = require('inquirer'); // interact with user, like input in python
const download = require('download-git-repo'); // download template repo
const ora = require('ora'); // spinner
const chalk = require('chalk'); // color?

const fs = require('fs');
const path = require('path');

const spinner = ora();

// 马的，例子是不是写错了 
console.log('argv: ', process.argv);
program.parse(process.argv);

console.log('args: ', program.args);
let dir = process.argv[1];

const questions = [{
  type: 'input',
  name: 'name',
  message: 'please input the name of your project',
  default: 'demo-static',
  validate: (name) => {
    if (/^[a-z]/.test(name)) {
      return true;
    } else {
      return 'project name must start with a lower letter';
    }
  }
}];

inquirer.prompt(questions).then((answers) => {
  downloadTemplate(answers);
});

function downloadTemplate(params) {
  spinner.start('loading');
  // 掉你妈，这个人写文章真的自己跑过例子吗
  const wtf =  path.resolve(dir, '../../', params.name);
  const hasDir = fs.existsSync(wtf);

  if (hasDir) {
    spinner.fail('directory already exists');
    return false;
  }

  download('gitlab:git.gitlab.com/demo-static', wtf, { clone: true }, function(err) {
    console.log('err: ', err);
    if (err) {
      spinner.fail(err);
      return false;
    }
    updateTemplateFile(params, wtf);
  });
}

// let's stop here today
function updateTemplateFile(params, dir){
  let { name, description } = params;
  fs.readFile(`${dir}/public/package.json`, (err, buffer)=>{
      if(err) {
          console.log(chalk.red(err));
          return false;
      }
      shell.rm('-f', `${dir}/.git`);
      shell.rm('-f', `${dir}/public/CHANGELOG.md`);
      let packageJson = JSON.parse(buffer);
      Object.assign(packageJson, params);
      fs.writeFileSync(`${dir}/public/package.json`, JSON.stringify(packageJson, null, 2));
      fs.writeFileSync(`${dir}/README.md`, `# ${name}\n> ${description}`);
      spinner.succeed('创建完毕');
  });
}
