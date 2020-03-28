#!/usr/bin/env node

const shell = require('shelljs');
const program = require('commander');
const inquirer = require('inquirer');
const download = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');

const fs = require('fs');
const path = require('path');

const spinner = ora();

// 马的，例子是不是写错了 
console.log('argv: ', process.argv);
program.parse(process.argv);

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
  fs.readFile(`${path.resolve(dir)}/public/package.json`, (err, buffer)=>{
      if(err) {
          console.log(chalk.red(err));
          return false;
      }
      shell.rm('-f', `${path.resolve(dir)}/.git`);
      shell.rm('-f', `${path.resolve(dir)}/public/CHANGELOG.md`);
      let packageJson = JSON.parse(buffer);
      Object.assign(packageJson, params);
      fs.writeFileSync(`${path.resolve(dir)}/public/package.json`, JSON.stringify(packageJson, null, 2));
      fs.writeFileSync(`${path.resolve(dir)}/README.md`, `# ${name}\n> ${description}`);
      spinner.succeed('创建完毕');
  });
}
