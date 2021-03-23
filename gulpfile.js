'use strict';

const del = require('del');
const gulp = require('gulp');
const filter = require('gulp-filter');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');

const CONFIGURATION = {
  source: './src',
  destination: './dist',
  watchers: [
    { match: ['./src/css/**/*'], tasks: ['css'] },
    { match: ['./src/img/**/*'], tasks: ['img'] },
    { match: ['./src/pdf/**/*'], tasks: ['pdf'] },
    { match: ['./src/favicon/**/*'], tasks: ['favicon'] },
    { match: ['./src/*.hbs'], tasks: ['html'] }
  ]
};

gulp.task('clean', () => {
  return del(CONFIGURATION.destination);
});

gulp.task('css', () => {
  return gulp.src(`${CONFIGURATION.source}/css/**/*`)
    .pipe(gulp.dest(`${CONFIGURATION.destination}/css`));
});

gulp.task('img', () => {
  return gulp.src(`${CONFIGURATION.source}/img/**/*`)
    .pipe(gulp.dest(`${CONFIGURATION.destination}/img`));
});

gulp.task('pdf', () => {
  return gulp.src(`${CONFIGURATION.source}/pdf/**/*`)
    .pipe(gulp.dest(`${CONFIGURATION.destination}/pdf`));
});

gulp.task('favicon', () => {
  return gulp.src(`${CONFIGURATION.source}/favicon/**/*`)
    .pipe(gulp.dest(CONFIGURATION.destination));
});

gulp.task('html', () => {
  return gulp.src(`${CONFIGURATION.source}/*.hbs`)
    .pipe(handlebars({}, { ignorePartials: true, batch: [CONFIGURATION.source] }))
    .pipe(filter(['**', `!*/base.hbs`]))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(CONFIGURATION.destination));
});

gulp.task('watch', () => {
  CONFIGURATION.watchers.forEach(item => {
    gulp.watch(item.match, gulp.series(item.tasks));
  });
});

gulp.task('default', gulp.series('clean', 'css', 'img', 'pdf', 'favicon', 'html', 'watch'))