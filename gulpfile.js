const gulp = require('gulp'); 
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const cleanCss = require('gulp-clean-css');


//Start initilizing
//Start creating the dev folder and all the required files
gulp.task('initiate', function() {
	
	gulp.src('src/*.html')
		.pipe(gulp.dest('dev'))
	
	gulp.src('src/js/*.js')
		.pipe(gulp.dest('dev/js'))
	
	gulp.src('src/sass/*.scss')
		.pipe(gulp.dest('dev/sass'))
	
	gulp.src('src/css/*.css')
		.pipe(gulp.dest('dev/css'))

	gulp.src('src/assets/css/*.css')
		.pipe(gulp.dest('dev/assets/css'))
	gulp.src('src/assets/js/*.js')
		.pipe(gulp.dest('dev/assets/js'))
	gulp.src('src/assets/images')
		.pipe(gulp.dest('dev/assets'))
});



//Start the compilation process
//Start the server
gulp.task('serve', function(){
	browserSync.init({
		server: 'src'
	});
});

//Start SASS
gulp.task('sass', function() {
	gulp.src('src/sass/*.scss')
		.pipe(sass().on('error',sass.logError))
		.pipe(gulp.dest('src/css'))
});

//Start Watching
gulp.task('watch', function(){
	gulp.watch(['src/sass/*.scss'], ['sass']);
	gulp.watch(['src/*.html']).on('change',browserSync.reload);
	gulp.watch(['src/css/*.css']).on('change',browserSync.reload);
	gulp.watch(['src/js/*.js']).on('change',browserSync.reload);
});

//Start serving and watching task
gulp.task('default', ['serve','watch']);


//Start the Building Process
//Building the final Production Output
gulp.task('build', function() {

	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('prod/js'))
	gulp.src('src/css/*.css')
		.pipe(cleanCss())
		.pipe(gulp.dest('prod/css'))
	gulp.src('src/*.html')
		.pipe(gulp.dest('prod'))

	gulp.src('src/assets/css/*.css')
		.pipe(gulp.dest('prod/assets/css'))
	gulp.src('src/assets/js/*.js')
		.pipe(gulp.dest('prod/assets/js'))
	gulp.src('src/assets/images/*')
		.pipe(gulp.dest('prod/assets/images'))
});

//End of file