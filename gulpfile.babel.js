import { src, dest, series, watch } from "gulp";
import pug from "gulp-pug";
import del from "del";
import browserSync from "browser-sync";
import image from "gulp-image";

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
  build: "build",
};

const buildHtml = () =>
  src(routes.pug.src).pipe(pug()).pipe(dest(routes.pug.dest));

const buildImage = () => src(routes.img.src).pipe(image()).pipe(dest(routes.img.dest))

const clean = () => del(routes.build);

const server = () => {
  bs.init({
    server: routes.build
  });

  watch(routes.pug.watch, buildHtml).on("change", bs.reload);
  watch(routes.img.src, buildImage).on("change", () => {
    bs.reload();
  });
}

const prepare = series([clean, buildImage, buildHtml])

export const dev = series([prepare, server]);
