const gulp = require('gulp');                   //Gulp
const sass = require('gulp-sass');              //SASS compiler
const babel = require('gulp-babel-compile');    //ES6 to ES5 complier
const concat = require('gulp-concat');          //Join JS files
const uglify = require('gulp-uglify');          //Minify JS
const htmlmin = require('gulp-htmlmin');        //Minify HTML
const imagemin = require('gulp-imagemin');      //Minify images
const csso = require('gulp-csso');              //Remove redundant, compression, and restructuring
const sourcemaps = require('gulp-sourcemaps');  //Maps CSS to SASS files in developer tools

// DEFAULT task is set to run all
// $ gulp
gulp.task('default', [
    'html',
    'css',
    'js',
]);   

// WATCH automatically runs the task accociated with a file type when it is save.
// $ gulp watch
gulp.task('watch', ()=> {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/sass/*.sass', ['css']);
});

// HTML minifies to clear tabs, line-breaks, and spaces, as well as comments
// $ gulp html
gulp.task('html', ()=> {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true}))
    .pipe(gulp.dest('dist'));
});

/* CSS creats a map between the sass and css for debugging in developers tools,
/  compiles the sass, minifies it, writes the map,
/  and saves both a dev copy and aproduction file. */
// $ gulp css
gulp.task('css', ()=> {
    gulp.src('src/sass/*.sass')
        .pipe(sourcemaps.init())    
        .pipe(sass().on('error', sass.logError))
        .pipe(csso())
        .pipe(sourcemaps.write('src/css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(gulp.dest('src/css'));
});

/* JS compiles ES6 to ES5, joins the javascript files into one, minifies it, then saves dev and live versions. */
// $ gulp js
gulp.task('js', ()=> {
    gulp.src([
            'src/js/*.js',
            '!src/js/main.js',])
        .pipe(babel({
                presets: ['env'],
                //sourceMap: true,
                sourceRoot: 'src'}))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(gulp.dest('src/js'));
});

// still testing
/*gulp.task('imgMin', ()=> {
    return gulp.src('src/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});*/
