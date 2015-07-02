/*
 * grunt-sass-themer
 *
 *
 * Adapted from the grunt-contrib-sass module.
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var path = require('path'),
    sass = require('node-sass'),
    fs = require('fs'),
    _ = grunt.util._,
    async = grunt.util.async,
    sassOptions = {
      render: ['file', 'includePaths', 'outputStyle', 'sourceComments']
    };

  grunt.registerMultiTask('sassThemer', 'Compile multiple themed SASS files to CSS', function () {
    var options = {
        root: './',
        output: 'generated',
        themeDir: 'themes',
        themeFilesStartWithUnderscore: true,
        sassExtension: 'scss',
        placeholder: '{{themeName}}',
        themeImport: 'theme'
      },
      done = this.async(),
      srcFiles = this.files;

    options = _.extend(options, this.options());

    async.forEachSeries(options.themes, function (theme, nextTheme) {

      console.log('Processing theme: ' + theme);

      var themePath = getThemePath(options, theme);

      var rs = fs.createReadStream(themePath);

      rs.pipe(fs.createWriteStream(options.themeImport));

      rs.on('end', function() {

        async.forEachSeries(srcFiles, function(f, nextFileObj) {
          var destFile = options.output + '/' + f.dest.replace(options.placeholder, theme);

          var files = f.src.filter(function(filepath) {
            // Warn on and remove invalid source files (if nonull was set).
            if (!grunt.file.exists(filepath)) {
              grunt.log.warn('Source file "' + filepath + '" not found.');
              return false;
            } else {
              return true;
            }
          });

          if (files.length === 0) {
            if (f.src.length < 1) {
              grunt.log.warn('Destination not written because no source files were found.');
            }

            // No src files, goto next target. Warn would have been issued above.
            return nextFileObj();
          }

          var compiled = [];

          async.concatSeries(files, function(file, next) {
            compileSass(file, options, function(err, css) {
              if (!err) {
                compiled.push(css);
                next();
              } else {
                nextFileObj(err);
              }
            });
          }, function() {
            if (compiled.length < 1) {
              grunt.log.warn('Destination not written because compiled files were empty.');
            } else {
              grunt.file.write(destFile, compiled.join(grunt.util.normalizelf(grunt.util.linefeed)));
              grunt.log.writeln('File ' + destFile.cyan + ' created.');
            }
            nextFileObj();
          });
        }, nextTheme);
      });

    }, done);

  });

  var getThemePath = function(options, theme) {
    var themeFileImport = options.themeFilesStartWithUnderscore ? "_" + theme : theme;
    themeFileImport += '.' + options.sassExtension;

    return path.join(options.root, options.themeDir, themeFileImport );
  };

  var compileSass = function(srcFile, options, callback) {
    options = _.extend({
      file: srcFile
    }, options);
    options.includePaths = options.includePaths || [path.dirname(srcFile)];

    var css;
    var srcCode = grunt.file.read(srcFile);

    var renderOpts = {
      file: options.file,
      includePaths: options.includePaths,
      outputStyle: options.outputStyle,
      sourceComments: options.sourceComments
    };

    sass.render(_.pick(renderOpts, sassOptions.render),
      function themerRenderCallback(error, result){
        if(error){
          sassError(error);
          callback(true, result.css.toString('utf-8'));
        }
        else {
          callback(null, result.css.toString('utf-8'));
        }
    });
  };

  var formatSassError = function(e) {
    var pos = '[' + 'SASS' + e.line + ':' + ('CSS' + e.column) + ']';
    return e.filename + ': ' + pos + ' ' + e.message;
  };

  var sassError = function(e) {
    var message = sass.formatError ? sass.formatError(e) : formatSassError(e);

    grunt.log.error(message);
    grunt.fail.warn('Error compiling SASS.');
  };

};
