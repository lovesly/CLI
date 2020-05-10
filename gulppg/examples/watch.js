const { watch, series } = require('gulp')

function clean(cb) {
    console.log('clean');
    cb();
}

function javascript(cb) {
    console.log('javascript')
    cb();
}

function css(cb) {
    cb()
}

watch('/examples/*.css', css);


exports.watchJS = () => {
    watch('examples/*.js', series(clean, javascript));
}