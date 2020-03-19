# viur-vi-styling
Base styling repository for viur-vi

## Embedding in the project
<pre>
[submodule "sources/vi"]
	path = sources/vi
	url = https://github.com/viur-framework/viur-vi-styling.git
</pre>

## Needed depenencies
<pre>
npm install gulp gulp-load-plugins fs path gulp-less gulp-postcss postcss-zindex gulp-autoprefixer postcss-focus postcss-discard-comments gulp-cssnano gulp-join-media-queries gulp-rename gulp-sourcemaps gulp-babel gulp-concat gulp-uglify copy gulp-cheerio del gulp-imagemin gulp-flatten gulp-exec gulp-print gulp-filter gulp-uglify
</pre>
most of them should be already installed if the project uses ignite with gulp

## Register as project Task
at this line to gulpfile.js file  
`const viBuildTasks = require('./vi/vi_tasks');`

## Run gulp Tasks
the main task can be triggered via `gulp vi`  
you can run each single part of this script via:  
 - `gulp vi_js`  
 - `gulp vi_editor`
 - `gulp vi_css`
 - `gulp vi_icons`
 - `gulp vi_images`


## The projectstructure
<pre>
.  
├── deploy  
│   ├── ..  
│   ├── vi_plugins  
│   │   ├── test_plugin         <-- each plugins has its own folder
│   │   │   ├── static          <-- static folder for plugin / could contain embedsvg folder for icons
│   │   │   └── style.less      <-- vi_plugin less definitions
│   │   ├── __init__.py         <-- vi plugins registration
│   │   └── vi_custom.less      <-- less overrides / vi_plugin less imports
│   ├── viur  
│   │   ├── vi  
│   │   │   ├── public  
│   │   │   │   ├── css         <-- will be generated / a defaultset is part of viur-vi submodule   
│   │   │   │   ├── embedsvg    <-- will be generated / a defaultset is part of viur-vi submodule  
│   │   │   │   ├── htmleditor  <-- will be generated / a defaultset is part of viur-vi submodule  
│   │   │   │   ├── images      <-- will be generated / a defaultset is part of viur-vi submodule  
│   │   │   │   ├── js          <-- will be generated / a defaultset is part of viur-vi submodule  
│   │   │   │   └── ..  
│   │   │   └── ..  
│   .   .  
│   .     
├── sources  
│   ├── gulpfile.js             <-- main gulpfile  
│   ├── embedsvg                <-- project icons / icons subfolder should be the icons submodule
│   │   └── ..  
│   ├── images                  <-- project images, will be copied to deploy/static/images
│   │   └── ..  
│   ├── js                      <-- project js-scripts
│   │   └── ..  
│   ├── less                    <-- project less styling
│   │   └── ..  
│   ├── vi                      <-- viur-vi-styling submodule
│   │   ├── ...  
│   │   └── vi_tasks.js         <-- vi styling tasks  
.   .  
.  
</pre>
