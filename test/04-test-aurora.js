/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('Aurora theme (Corona distribution)', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('drupal-theme:app', [
        '../../app',
        '../../aurora',
        '../../extras'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'corona.info',
      'template.php',
      // We don't want to test all files, but important ones.
      'sass/config/_config.scss',
      'sass/global/_normalize.css.scss',
      'sass/config/variables/_colors.scss'
    ];

    helpers.mockPrompt(this.app, {
      'projectName': 'Corona',
      'baseTheme': 'aurora',
      'auroraType': 'corona',
      'advFileOptions': false,
      'extraOptions': []
    });
    this.app.options['skip-install'] = true;
    this.app.options['skip-welcome-message'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
