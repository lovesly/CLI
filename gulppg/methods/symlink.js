const { src, symlink } = require('gulp')

// 没看明白，symlink 和 dest 有啥区别？？
function link() {
    return src('examples/*.js')
        .pipe(symlink('output/'));
}

exports.link = link;