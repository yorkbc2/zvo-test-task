let gulp = require('gulp')
let sass = require('gulp-sass')
let minify = require('gulp-minify')

gulp.task('sass', function () {
	gulp.src('scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css/'))
})

gulp.task('minify', function () {
	gulp.src('src/**/*.js')
		.pipe(minify({
			ext: {
				src: "-uncompressed.js",
				min: ".min.js"
			},
			exclude: ['tasks'],
			ignoreFiles: []
		}))
		.pipe(gulp.dest('dist'))
})

gulp.task('default', function () {
	gulp.watch(['src/**/*.js','scss/**/*.scss'], ['minify','sass'])
})