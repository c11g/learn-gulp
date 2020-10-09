import { src, dest, series } from "gulp";
import pug from "gulp-pug";
import del from "del";

const routes = {
  pug: {
    src: "src/*.pug",
    dest: "build",
  },
  build: "build",
};

const buildHtml = () =>
  src(routes.pug.src).pipe(pug()).pipe(dest(routes.pug.dest));

const clean = () => del(routes.build);

export const dev = series([clean, buildHtml]);
