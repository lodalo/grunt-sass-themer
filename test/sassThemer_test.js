var grunt = require('grunt');

String.prototype.removeWhitespace = function() {
  return this.replace(/(\s)/gm, '');
};

exports.sassThemer = {
  with_underscores: function(test) {
    test.expect(8);

    var actualBlack, expectedBlack,
        actualWhite,expectedWhite;

    // Tests for files with underscores
    // ******************************************
    test.ok(grunt.file.exists('tmp/simple_with_underscores_black.css'), 'simple black with underscores exists');
    test.ok(grunt.file.exists('tmp/simple_with_underscores_white.css'), 'simple white with underscores exists');

    actualBlack = grunt.file.read('tmp/simple_with_underscores_black.css').removeWhitespace();
    expectedBlack = grunt.file.read('test/expected/simple_black.css').removeWhitespace();
    test.equals(actualBlack, expectedBlack, 'simple black with underscores is as expected');

    actualWhite = grunt.file.read('tmp/simple_with_underscores_white.css').removeWhitespace();
    expectedWhite = grunt.file.read('test/expected/simple_white.css').removeWhitespace();
    test.equals(actualWhite, expectedWhite, 'simple white with underscores  is as expected');

    // Tests for files without underscores
    // ******************************************
    test.ok(grunt.file.exists('tmp/simple_without_underscores_black.css'), 'simple black without underscores exists');
    test.ok(grunt.file.exists('tmp/simple_without_underscores_white.css'), 'simple white without underscores exists');

    actualBlack = grunt.file.read('tmp/simple_without_underscores_black.css').removeWhitespace();
    expectedBlack = grunt.file.read('test/expected/simple_black.css').removeWhitespace();
    test.equals(actualBlack, expectedBlack, 'simple black without underscores is as expected');

    actualWhite = grunt.file.read('tmp/simple_without_underscores_white.css').removeWhitespace();
    expectedWhite = grunt.file.read('test/expected/simple_white.css').removeWhitespace();
    test.equals(actualWhite, expectedWhite, 'simple white without underscores  is as expected');

    test.done();
  }
};
