/*
import this file using:
	const viBuildTasks = require('./vi/vi_tasks');
in gulpfile.js

and Call:
	`gulp vi` to call all necessary Tasks
 */

const gulp = require('gulp');
const plugins = require('gulp-load-plugins');
const fs = require('fs');

let applicationFolder = "../appengine";
if (! fs.existsSync(applicationFolder)){
	applicationFolder = "../deploy"
}

let srcpaths = {
	images: './vi/images/**/*',
	embedsvg: './vi/embedsvg/**/*',
	editor: './vi/htmleditor/**/*.js',
	js: './vi/js/**/*.js',
};

let destpaths = {
	css: applicationFolder+'/viur/vi/public/css',
	images: applicationFolder+'/viur/vi/public/images',
	embedsvg: applicationFolder+'/viur/vi/public/embedsvg',
	editor: applicationFolder+'/viur/vi/public/htmleditor',
	js: applicationFolder+'/viur/vi/public/js',
};


function loadTask(task, options) {
	return require('./gulptasks/' + task)(gulp, plugins, options)
}

//Build Editor
gulp.task("vi_editor", loadTask("editor_task",{
	src: srcpaths.editor,
	dest: destpaths.editor
}));

//less to css
gulp.task('vi_css', loadTask('css_task', {
	src: './vi/less/vi.less',
	dest: destpaths.css
}));

gulp.task('vi_icons', loadTask('icon_task', {
	src: ["vi/embedsvg/**/*", //default vi
		  "embedsvg/**/*", //project icons
		  applicationFolder+"/vi_plugins/**/static/embedsvg/**/*" //vi_plugins
	],
	dest: destpaths.embedsvg
}));

gulp.task('vi_images', loadTask('image_task', {
	src: [srcpaths.images,
		 "images/**/*", //project images
		 applicationFolder+"/vi_plugins/**/static/images/**/*" //vi_plugins
		],
	dest: destpaths.images
}));

gulp.task("vi_js", loadTask("js_task",{
	src: srcpaths.js,
	dest: destpaths.js
}));

gulp.task('vi', gulp.series([
	'vi_editor',
	'vi_js',
	"vi_css",
	"vi_icons",
	"vi_images"

]));

