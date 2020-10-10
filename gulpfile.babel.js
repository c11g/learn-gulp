import { src, dest, series, watch } from "gulp";
import pug from "gulp-pug";
import del from "del";
import browserSync from "browser-sync";
import image from "gulp-image";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
sass.compiler = require("node-sass");

const bs = browserSync.create();

const routes = {
  pug: {
    src: "src/*.pug",
    watch: "src/**/*.pug",
    dest: "build",
  },
  img: {
    src: "src/image/*",
    dest: "build/image"
  },
  scss: {
    src: "src/scss/*.scss",
    watch: "src/scss/**/*.scss",
    dest: "build/css"
  },
  build: "build",
};

const buildHtml = () =>
  src(routes.pug.src).pipe(pug()).pipe(dest(routes.pug.dest));
const buildImage = () => src(routes.img.src).pipe(image()).pipe(dest(routes.img.dest))
const buildCss = () => 
  src(routes.scss.src)
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write("./"))
  .pipe(dest(routes.scss.dest))

const clean = () => del(routes.build);

const server = () => {
  bs.init({
    server: routes.build
  });

  watch(routes.pug.watch, buildHtml).on("change", bs.reload);
  watch(routes.scss.watch, buildCss).on("change", () => {
    bs.reload();
  });
  watch(routes.img.src, buildImage).on("change", () => {
    bs.reload();
  });
}

const prepare = series([clean, buildImage, buildHtml, buildCss])

export const dev = series([prepare, server]);
