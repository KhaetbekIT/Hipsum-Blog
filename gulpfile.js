const { task, watch, dest, src, parallel, series } = require('gulp')
const sass = require("gulp-sass")(require("sass"))
const sourcemaps = require("gulp-sourcemaps")
const pug = require("gulp-pug")
const clear = require("del")


task("delete", () => {
    return clear("./build")
})

task("pug", () => {
    return src("./src/pug/pages/*.pug").pipe(
        pug({
            pretty: true
        })

    ).pipe(dest("./build/"))
})

task("css", () => {
    return src("./src/sass/main.scss").pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'compressed'
            }))
        .pipe(sourcemaps.write("maps"))
        .pipe(dest("./build/css/"))
})

task("images", () => {
    return src("./src/img/**/*.*").pipe(dest("./build/img/"))
})

task("libs", () => {
    return src("./src/libs/**/*.*").pipe(dest("./build/libs/"))
})

task("watch", () => {
    watch("./src/img/**/*.*", parallel("images"))
    watch("./src/libs/**/*/*", parallel("libs"))
    watch("./src/pug/**/*.*", parallel("pug"))
    watch("./src/sass/**/*.*", parallel("css"))
})

task("default", series(
    "delete",
    parallel("pug", "css"),
    parallel("images", "libs", "watch")
))