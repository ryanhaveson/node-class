var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
    return gulp.src(jsFiles)
        .pipe(jscs())
        .pipe(jscs.reporter())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }));
});

gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    var injectSrc = gulp.src(['./public/css/*.css',
                              './public/js/*.js'], {read: false});
    
    var injectOptions = {
        ignorePath: '/public'
    };
    
    var options = {
        bowerJson : require('./bower.json'),
        directory : './public/lib',
        ignorePath: '../../public',
        devDependencies : true
    };
    
    
    return gulp.src('./src/views/*.jade')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});
gulp.task('serve', ['style', 'inject'], function() {
   var options = {
       script: 'app.js',
       delayTime:1,
       env: {
           'PORT': 3000
       },
       watch: jsFiles
   }; 
   return nodemon(options)
    .on('restart', function(ev) {
       console.log('Restarting....');
   });
});