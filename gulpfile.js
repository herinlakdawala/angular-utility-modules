const gulp = require ('gulp');
const del = require ('del');
const zip = require ('gulp-zip');
const fse = require ('fs-extra');
const runSequence   = require ('run-sequence');
const rename = require ('gulp-rename');
const tar = require ('gulp-tar');
const gzip = require ('gulp-gzip');
const change = require ('gulp-change');
const packageObj = fse.readJsonSync('package.json');
const ngPackageObj = fse.readJsonSync('ng-package.json');

// The appending of Timestamp in case of unstable version
/*var currentDate = new Date().getTime();
const packageVersion = (packageObj.version).includes('SNAPSHOT') ? (packageObj.version).replace ('SNAPSHOT', currentDate) : packageObj.version;*/

function updateVersion_scripts (content) {
  return content.replace (/inline.bundle.js/g, packageObj.version+'/inline.bundle.js')
    .replace (/polyfills.bundle.js/g, packageObj.version+'/polyfills.bundle.js')
    .replace (/vendor.bundle.js/g, packageObj.version+'/vendor.bundle.js')
    .replace (/main.bundle.js/g, packageObj.version+'/main.bundle.js')
    .replace (/assets/g, packageObj.version+'/assets')
}

function updateVersion_assets (content) {
  return content.replace (/assets/g, packageObj.version+'/assets');
}

gulp.task ('clean:artifacts', function (){
  return del ('./artifacts');
});

gulp.task ('version:artifact', function () {
  return gulp.src (['./dist/*', '!./dist/assets', '!./dist/index.html', '!./dist/config.json'])
    .pipe (rename (function (path) {
      path.dirname += '/'+packageObj.version;
    }))
    .pipe (gulp.dest ('./artifacts/build/'));
});

gulp.task ('version:IndexFile', function () {
  return gulp.src ('./dist/index.html')
    .pipe (change (updateVersion_scripts))
    .pipe (gulp.dest ('./artifacts/build/'));
});

gulp.task ('version:assets', function () {
  return gulp.src (['./artifacts/build/'+packageObj.version+'/*.js', './artifacts/build/'+packageObj.version+'/*.map'])
    .pipe (change (updateVersion_assets))
    .pipe (gulp.dest ('./artifacts/build/'+packageObj.version));
});

gulp.task ('align:configFile', function () {
  return gulp.src ('./dist/config.json')
    .pipe (gulp.dest ('./artifacts/build/'));
});

gulp.task ('align:assets', function () {
  return gulp.src ('./dist/assets/**/*')
    .pipe (gulp.dest ('./artifacts/build/'+packageObj.version+'/assets/'));
});

gulp.task ('zip:artifact', function () {
  return gulp.src ('./artifacts/build/**')
    .pipe (zip (packageObj.name + '.zip'))
    .pipe (gulp.dest ('./artifacts/deploy/'));
});

gulp.task ('tar:artifact', function () {
  return gulp.src ('./artifacts/build/**')
    .pipe (tar (packageObj.name + '.tar'))
    .pipe (gzip ())
    .pipe (gulp.dest ('./artifacts/deploy/'));
});

gulp.task ('build:artifact', function () {
  runSequence ('clean:artifacts', ['version:artifact'], 'version:IndexFile', 'version:assets', 'align:configFile', 'align:assets', ['zip:artifact', 'tar:artifact']);
});

gulp.task ('rename:tar', function () {
  return fse.rename ('./' + ngPackageObj.dest + '/' + packageObj.name + '-' + packageObj.version + '.tgz',
    './' + ngPackageObj.dest + '/' + packageObj.name + '.tgz');
});

gulp.task ('clean:tar', function () {
  return del ('./' + ngPackageObj.dest + '.tgz');
});

gulp.task ('format:package', function () {
  runSequence ('rename:tar', 'clean:tar');
});
