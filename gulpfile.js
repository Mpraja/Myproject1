const
  { src, dest, series, parallel, watch } = require('gulp'),
  del = require('del'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-csso'),
  renameFile = require('gulp-rename'),
  imageMinify = require('gulp-image'),
  minifyJs = require('gulp-uglify-es').default,
  cssPrefixer = require('gulp-autoprefixer'),
  imageConvertor = require('gulp-images-convert'),
  browserSync = require('browser-sync').create();

const isProd = process.env.NODE_ENV === 'production';

function clean() {
  return del('public');
}

function copyFonts() {
  return src('node_modules/@fortawesome/fontawesome-free/webfonts/**/*.{otf,eot,ttf,woff,woff2,svg}')
    .pipe(dest('public/webfonts'));
}

function copyImages() {
  return src('src/images/**/*.{png,jpeg,jpg,gif,webp}')
    .pipe(imageMinify()) // Optimize and reduce image size.
    
    .pipe(dest('public/images'));
}

function copyHtml() {
  return src('src/**/*.html')
    .pipe(dest('public'));
}

function scssToCss() {
  return src('src/scss/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({ style: 'expanded' }))
    .pipe(dest('public/css'))
    .pipe(browserSync.stream());//Automatic sync for css
}

function concatCssFiles() {
  return src([
    'node_modules/animate.css/animate.css',
    'public/css/style.css',
  ])
  .pipe(concat('style.css'))
  .pipe(minifyCss())// Minify css file
  .pipe(renameFile({ extname: '.min.css' }))
  .pipe(dest('public/css'));
}

function cssPrefixerFiles() {
  return src('public/css/**/*.css')
  .pipe(cssPrefixer())//Add css vendor prefixes
  .pipe(dest('public/css'));
}

function concatJs() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/animejs/lib/anime.js',
  ])
  .pipe(concat('vendor.js'))// For packages
  .pipe(dest('public/js'));
}

function copyJs() {
  return src('src/js/**/*.js')
    .pipe(dest('public/js'));
}

function minifyJsFiles() {
  return src('src/js/**/*.js')
    .pipe(minifyJs()) //Minify Js file
    .pipe(renameFile({ extname: '.min.js' }))
    .pipe(dest('public/js'))
}

function serve() {
  watch('src/images/**/*.{png,jpeg,jpg,gif,webp}', copyImages);
  watch('src/scss/**/*.scss', scssToCss);
  watch('src/js/**/*.js', copyJs);
  watch('src/**/*.html', copyHtml);

  browserSync.init({
    server: { baseDir: 'public' },
    browser: "firefox"
  });
  watch('public/js/**/*.js').on('change', browserSync.reload);//Automatic browser Refresh
  watch('public/css/**/*.css').on('change', browserSync.reload);
  watch('public/**/*.html').on('change', browserSync.reload);
}

exports.build = series(clean, copyFonts, copyImages, copyHtml, scssToCss, concatCssFiles, cssPrefixerFiles, concatJs, copyJs, minifyJsFiles);
exports.serve = series(this.build, serve);


