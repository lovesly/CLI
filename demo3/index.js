const minimist = require('minimist');
const edition = require('./package.json').version;
/**
 * https://blog.csdn.net/qq_40882724/article/details/85618011
 * 文章中搭配的 免费数据服务，开始收钱了。。。
 * 先不管了，后面找个免费的，继续
 */
module.exports = () => {
  const origArgs = process.argv;
  // first two parameters are info about path
  // console.log(origArgs);
  const args = minimist(origArgs.slice(2));
  // what is _[0]??
  let cmd = args._[0] || 'help';
  if (args.v || args.version) {
    cmd = 'version';
  }

  switch(cmd) {
    case 'today':
      console.log('今天天气不错呢，暖心悦目！');
      break;
    case 'tomorrow':
      console.log('明天下大雨，注意带雨伞！');
      break;
    case 'version':
      console.log(edition)
      break;
    case 'help':
      console.log(`
        weather [command] <options>
          today .............. show weather for today
          tomorrow ............show weather for tomorrow
          version ............ show package version
          help ............... show help menu for a command
      `);
      break;
  }
}