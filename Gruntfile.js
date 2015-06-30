module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({

    "clean": {
      "tmp": 'tmp'
    },

    "jshint": {
      "all": [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],

      "options": {
        "jshintrc": '.jshintrc'
      }
    },

    "sassThemer": {
      "with_underscores": {
        "options": {
          "output": 'tmp',
          "themeFilesStartWithUnderscore": true,
          "themes": ['black', 'white'],
          "themeDir": 'test/fixtures/themes-with-underscore',
          "themeImport": 'test/fixtures/_theme.scss',
          "outputStyle": 'compact'
        },
        "files": {
          "simple_with_underscores_{{themeName}}.css": ['test/fixtures/simple.scss']
        }
      },
      "without_underscores": {
        "options": {
          "output": 'tmp',
          "themeFilesStartWithUnderscore": false,
          "themes": ['black', 'white'],
          "themeDir": 'test/fixtures/themes-without-underscore',
          "themeImport": 'test/fixtures/_theme.scss',
          "outputStyle": 'compact'
        },
        "files": {
          "simple_without_underscores_{{themeName}}.css": ['test/fixtures/simple.scss']
        }
      }
    },

    "nodeunit": {
      "tests": ['test/*_test.js']
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'jshint', 'sassThemer', 'nodeunit']);
};
