var gulp = require('gulp')
, fs = require('fs')
, minifyHtml= require('gulp-minify-html')
, minifyCss = require('gulp-minify-css')
, uglify = require("gulp-uglify")
, concat = require('gulp-concat')
, clean = require('gulp-clean');

// MINIFY HTML
gulp.task('minify-html', function(){
   
});

gulp.task('copy', function () {
    
    gulp.src('./app/manifest.webapp', { base: './app' })
    .pipe(gulp.dest('./www/'));

    gulp.src('./app/src/css/*.*', { base: './app/src/css' })
    .pipe(gulp.dest('./www/src/css/'));

    gulp.src('./app/images/*.*', { base: './app' })
    .pipe(gulp.dest('./www/'));    

    gulp.src('./app/lib/**/', { base: './app' })
    .pipe(gulp.dest('./www/'));
});

// CLEAN

gulp.task('clean', function () {
    gulp.src('./www/', {read: false})
    .pipe(clean());
});

// MINIFY
gulp.task('minify', function () {
   
       gulp.src('./app/src/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('www/src/css'));
    
     gulp.src('./app/src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('www/src/js'));
    
     gulp.src('./app/src/**/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('www/src/'));
 
});


gulp.task('default', function () {
    gulp.start('clean', 'minify', 'copy');
});