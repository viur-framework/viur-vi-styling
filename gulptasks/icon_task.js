module.exports = function (gulp, plugins, options) {
	plugins.rename = require('gulp-rename');
	plugins.cheerio = require('gulp-cheerio');
	plugins.del = require('del');
	plugins.imagemin = require('gulp-imagemin');
	plugins.flatten = require('gulp-flatten');
	plugins.exec = require("gulp-exec");
	plugins.print = require("gulp-print").default;
	plugins.filter = require("gulp-filter");

	gulp.task('vi_icons_clean', function () {
		plugins.del([options.dest + '/**/*.svg'], {force: true})
		return gulp.src(options.src)
		}
	)

	gulp.task('vi_icons_collection', function () {

		return gulp.src(options.src)
			.pipe(plugins.filter(['**/*.svg','!*/logos/**','!*/**/logos/**'])) // alles außer logos
			//.pipe(plugins.print())
			.pipe(plugins.imagemin([
				plugins.imagemin.mozjpeg({progressive: true}),
				plugins.imagemin.optipng({optimizationLevel: 5}),
				plugins.imagemin.svgo({
					plugins: [
						{removeViewBox: false},
						{removeDimensions: true}
					]
				})
			]))
			.pipe(plugins.cheerio({
				run: function ($, file) {
					$('style').remove();
					$('title').remove();
					$('[id]').removeAttr('id');
					//$('[class]').removeAttr('class')
					//$('[fill]').removeAttr('fill');
					$('svg').addClass('icon').removeAttr("x").removeAttr("y");
				},
				parserOptions: {xmlMode: true}
			}))
			.pipe(plugins.rename(function(path){
				if (path.extname) {
					if (path.dirname === '.') {
						path.dirname = 'icons';
					}
					path.basename = path.dirname + '-' + path.basename;
					path.dirname = '';
				}
			}))
			.pipe(plugins.flatten())
			.pipe(gulp.dest(options.dest));
		}
	);

	gulp.task('vi_logos_collection', function () {

		return gulp.src(options.src) //.concat(['!./**/embedsvg/**/*','./**/embedsvg/logos/*']) destroys ordering ---<
			.pipe(plugins.filter(['embedsvg/logos/**','**/embedsvg/logos/**']))
			//.pipe(plugins.print())
			.pipe(plugins.imagemin([
				plugins.imagemin.mozjpeg({progressive: true}),
				plugins.imagemin.optipng({optimizationLevel: 5}),
				plugins.imagemin.svgo({
					plugins: [
						{removeViewBox: false},
						{removeDimensions: true}
					]
				})
			]))
			.pipe(plugins.cheerio({
				run: function ($, file) {
					$('svg').addClass('logo').removeAttr('x').removeAttr('y');
				},
				parserOptions: {xmlMode: true}
			}))
			.pipe(plugins.rename(function(path){
				if (path.extname) {
					if (path.dirname === '.') {
						path.dirname = 'icons';
					}
					path.basename = path.dirname + '-' + path.basename;
					path.dirname = '';
				}
			}))
			.pipe(plugins.flatten())
			.pipe(gulp.dest(options.dest));
		}
	);

	gulp.task('vi_icons_object', function () {
		return gulp.src(".")
			.pipe(plugins.exec("python ./vi/scripts/gen-embedsvg.py"))
			.pipe(plugins.exec.reporter({
			err:true,
			stderr:true,
			stdout:true
		}))
	});

	return gulp.series([
		'vi_icons_clean',
		'vi_icons_collection',
		'vi_logos_collection',
		'vi_icons_object'
	])
};
