const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const imgmin = require("gulp-imagemin");
const babel = require("gulp-babel");

// gulp.task("hello",function(){
//     console.log(222)
// })

gulp.task("copyImg",()=>{
	gulp.src("img/**")
	.pipe(imgmin())
	.pipe(gulp.dest("dist/img"));
});

gulp.task("copyHtml",()=>{
	gulp.src("*.html").pipe(gulp.dest("dist")).pipe(connect.reload());
});

gulp.task("sass",function(){
	gulp.src("sass/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compact'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"));
	
});

// gulp.task("concat",function(){
// 	gulp.src(["js/.js"])
// 	.pipe(concat("main.js"))
// 	.pipe(gulp.dest("dist/js"))
// 	.pipe(uglify())
// 	.pipe(rename("main.min.js"))
// 	.pipe(gulp.dest("dist/js"));
// });
gulp.task("copyJs",function(){
    gulp.src("js/*.js").pipe(gulp.dest("dist/js"))
});

gulp.task("copyIcon",function(){
    gulp.src("font/*").pipe(gulp.dest("dist/font"))
});

gulp.task("watch",()=>{
	gulp.watch(["*.html","sass/*.scss","js/*.js","img/**"],["copyHtml","sass","copyJs","copyImg"]);
});

gulp.task("server",()=>{
	connect.server({
		root:"dist",
		livereload:true
	})
});

gulp.task("build",['copyHtml','copyImg','sass','copyJs'],function(){
	console.log("构建完成！");
});
gulp.task("default",["watch","server"]);