# grunt-sass-themer
=======================

> Compile theme-able SASS files to CSS. Use the same SASS files and only override variables for different themes.

[![Build Status](https://travis-ci.org/lodalo/grunt-sass-themer.svg?branch=master)](https://travis-ci.org/lodalo/grunt-sass-themer)
[![NPM version](https://badge.fury.io/js/grunt-sass-themer.svg)](http://badge.fury.io/js/grunt-sass-themer)
[![Dependency Status](https://david-dm.org/lodalo/grunt-sass-themer.png?theme=shields.io)](https://david-dm.org/lodalo/grunt-sass-themer)
[![devDependency Status](https://david-dm.org/lodalo/grunt-sass-themer.png?theme=shields.io)](https://david-dm.org/lodalo/grunt-sass-themer#info=devDependencies)

[![NPM](https://nodei.co/npm/grunt-sass-themer.png)](https://nodei.co/npm/grunt-sass-themer)

Based on [grunt-less-themes](https://github.com/hollandben/grunt-less-themes)

## Getting Started
This plugin requires node `>=5.4`, node-sass `>=3.4.2`, Grunt `>=0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sass-themer --save-dev
```
Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sass-themer');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4).

## sass-themer task
_Run this task with the `grunt sassThemer` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

This task is an extension of the [node-sass](https://github.com/andrew/node-sass) task. The options from that task are also compatible with this one.

#### output
Type: `String`
Default: 'generated'

This option defines the output directory for the `grunt-sass-theme` task.

#### themeDir
Type: `String`
Default: 'themes'

This option defines the directory where all the themes are hosted

#### themes
Type: `Array`

This option provides the `grunt-sass-themer` task with the names of each theme. This name is used to in finding the theme and in the generated file.

#### placeholder
Type: `String`
Default: '{{theme}}'

This option is the placeholder string used in the output CSS filename. The name of each theme will replace this placeholder.

#### themeImport
Type: `String`
Default: '_sassthemer_temp'

This option is the name of the theme file that is imported into each SASS file for compilation. The file is replaced on every iteration of the themes with the current theme in process.
If the name is left blank, a '_sassthemer_temp.scss' file will get created at the root level.
Make sure the name matches the @import directive in your main scss file or the compilation will fail. The underscore lets Sass know that the file is only a partial file and that it should not be generated into a CSS file.



### Usage Examples

#### Simple

```js
sassThemer: {
    dev: {
        options: {
            output: 'path/to/output'
        },
        files: {
            //destination: source
            'example_{{themeName}}.css': 'simple.scss'
        }
    }
}
```

#### Complex

```js
sassThemer: {
    dev: {
        options: {
            output: 'path/to/output',
            themeDir: 'path/to/themes'
        },
        files: {
            'core_{{themeName}}.css': ['core/*.scss'],
            'common_{{themeName}}.css': ['common/*.scss'],
            'components_{{themeName}}.css': ['components/*.scss']
        }
    }
}
```
