var gulp = require('gulp');
var fs = require("fs");
var browserify = require("browserify");
var gls = require('gulp-live-server');



var files = {
    server: ['routes/*.js','app.js'],
    front: ['front/*.jsx'],
    front_to: 'public/application.js',
    front_from: 'front/application.jsx'
};

gulp.task('serve', function() {
    var server = gls.new('bin/www');
    server.start();
    gulp.watch(files.server, () => server.start()); //restart my server
});


gulp.task('front', (cb) => {
    return browserify(files.front_from, {debug: true})
        // .ignore('react')
        // .ignore('react-dom')
        .transform("babelify")
        .bundle().on('error', cb)
        .pipe(fs.createWriteStream(files.front_to));
});


gulp.task('watch', () => gulp.watch(files.front, ['front']));



gulp.task('default', ['serve', 'front', 'watch'])