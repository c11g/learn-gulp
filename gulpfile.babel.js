import { src, dest, series, watch } from "gulp";
import pug from "gulp-pug";
import del from "del";
import browserSync from "browser-sync";

const bs = browserSync.create();

const routes = {
  pug: {
    src: "src/*.pug",
    watch: "src/**/*.pug",
    dest: "build",
  },
  build: "build",
};

const buildHtml = () =>
  src(routes.pug.src).pipe(pug()).pipe(dest(routes.pug.dest));

const clean = () => del(routes.build);

const server = () => {
  bs.init({
    server: routes.build
  });

  watch(routes.pug.watch, buildHtml).on("change", bs.reload);
}



export const dev = series([clean, buildHtml, server]);
