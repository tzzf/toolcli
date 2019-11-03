import program from 'commander';
import pkg from '../package.json';
import execa from 'execa';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin')

export function cli(args) {

    program.version(pkg.version, '-V, --version').usage('<command> [options]');


    program
        .command('tinypng')
        .description('tinypng')
        .action(async function() {
          const { stdout: pwd } = await execa('pwd');
            gulp.src(pwd + '/*')//需要压缩的图片放在这个路径下
                .pipe(imagemin([
                    imagemin.gifsicle({interlaced: true}),
                    imagemin.jpegtran({progressive: true}),
                    imagemin.optipng({optimizationLevel: 10}),
                    imagemin.svgo({
                        plugins: [
                            {removeViewBox: true},
                            {cleanupIDs: false}
                        ]
                    })
                ]))
                .pipe(gulp.dest('dist'));//压缩完成的图片放在这个路径下
            });

            program.parse(args);

}