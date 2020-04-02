module.exports = function (gulp, plugins, options) {

	plugins.sourcemaps = require('gulp-sourcemaps');
	plugins.babel = require('gulp-babel');
	plugins.concat = require('gulp-concat');
	plugins.uglify = require('gulp-uglify');
	plugins.nano = require('gulp-cssnano');
	plugins.copy = require('copy');


	//copy fonts
	gulp.task('vi_editor_fonts',
		function (cb) {
			return plugins.copy('./vi/htmleditor/font/*',options.dest,cb);
		}
	);

	//concat css
	gulp.task('vi_editor_css',
		function () {
			return gulp.src([
				"./vi/htmleditor/codemirror.css",
				"./vi/htmleditor/summernote-lite.css"
			])
			.pipe(plugins.concat('htmleditor.min.css'))
			.pipe(plugins.nano())
			.pipe(gulp.dest(options.dest));
		}
	);

	//concat js
	gulp.task('vi_editor_js',
		function () {
			return gulp.src(options.src)
			.pipe(plugins.concat('htmleditor.min.js'))
			//.pipe(plugins.uglify())
			.pipe(gulp.dest(options.dest));
		}
	);


	return gulp.series([
		'vi_editor_css',
		'vi_editor_fonts',
		'vi_editor_js'
	])
};
