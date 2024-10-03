const gulp = require("gulp");
// const connect = require("gulp-connect");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
// const open = require('gulp-open');
// const livereload = require("gulp-livereload");
const server = require('gulp-server-livereload');


gulp.task("server", function () {
	// connect.server({
	// 	name: "Messager",
	// 	root: 'dist',
	// 	port: 6780,
	// 	livereload: true
	// });

	// gulp.watch("src/*.html").on("change", connect.reload);
	// server({
	// 	livereload: true,
	// 	open: true,
	// })
	return gulp.src('dist')
	.pipe(server({
		livereload: true,
		open: true,
	}));
});

// gulp.task("browser-open", function () {
// 	var options = {
// 		uri: 'http://localhost:6780',
// 		app: 'chrome'
// 	};
// 	gulp.src("./dist/index.html")
// 	.pipe(open(options));
// })

gulp.task("styles", function () {
	return gulp
		.src("src/sass/**/*.+(scss|sass)")
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(rename({ suffix: ".min", prefix: "" }))
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
});

gulp.task("watch", function () {
	gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
	gulp.watch("src/*.html").on("change", gulp.parallel("html"));
	gulp.watch("src/js/**/*.js").on("change", gulp.parallel("scripts"));
	gulp.watch("src/fonts/**/*").on("all", gulp.parallel("fonts"));
	gulp.watch("src/icons/**/*").on("all", gulp.parallel("icons"));
	gulp.watch("src/img/**/*").on("all", gulp.parallel("images"));
});

gulp.task("html", function () {
	return gulp
		.src("src/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
	return gulp
		.src("src/js/**/*.js")
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
});

gulp.task("fonts", function () {
	return gulp
		.src("src/fonts/**/*")
		.pipe(gulp.dest("dist/fonts"))
		.pipe(connect.reload());
});

gulp.task("icons", function () {
	return gulp
		.src("src/icons/**/*")
		.pipe(gulp.dest("dist/icons"))
		.pipe(connect.reload());
});

gulp.task("images", function () {
	return gulp
		.src("src/img/**/*")
		.pipe(gulp.dest("dist/img"))
		.pipe(connect.reload());
});

gulp.task(
	"default",
	gulp.parallel(
		"watch",
		"server",
		"styles",
		"scripts",
		"fonts",
		"icons",
		"html",
		"images",
		// "browser-open"
	)
);