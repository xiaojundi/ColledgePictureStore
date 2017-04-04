/**
 * Created by HANG on 10/11/2016.
 */
const gulp = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
const gutil=require('gulp-util');
var source = require("vinyl-source-stream");
var babelify = require("babelify");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const babel = require("gulp-babel");
var browserify = require("browserify");
var connect= require("gulp-connect")


var  port = process.env.port || 5004;



const cssFiles = "./app/styles/css/*.css";
const sassFiles = "./app/style/*.scss";

const bundleFile = "./public/js/*.js";
gulp.task("sass", () => {
    gulp
        .src(sassFiles)
        .pipe(gulpSASS())
        .pipe(concatenate("style-sass.min.css"))
        .pipe(autoPrefix())
        //.pipe(cleanCSS())
        .pipe(gulp.dest("./public/style"));
});

gulp.task("css", () => {
    gulp
        .src('./app/style/list.css')
        .pipe(concatenate("styles.min.css"))
        .pipe(autoPrefix())
        .pipe(cleanCSS())
        .pipe(gulp.dest("./public/style"));
});

gulp.task('connect',function(){
    connect.server({
        // root:'./',
        port: port,
        livereload: true,
    })
});

gulp.task('browserify', ()=> {
     browserify('./app/js/main.js')
    .transform(babelify,{presets:["es2015", "react"]})
    .bundle().on('error',(e)=>{gutil.log(e)})
    .pipe(source('components.js'))
    .pipe(gulp.dest('./public/js'))
});



gulp.task('watch',()=>{

    gulp.watch('./app/js/**/*.js',['browserify']);
    gulp.watch('./public/**/*.css',['css']);
});

gulp.task("default", ['sass','css','browserify','connect', 'watch']);