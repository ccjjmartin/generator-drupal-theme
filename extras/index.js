'use strict';
var yeoman = require('yeoman-generator');

var extras = require('./extras.js');


var DrupalThemeExtrasGenerator = yeoman.generators.Base.extend({
  init: function () {

    this.on('end', function () {
      if (!this.options['skip-install']) {
        var bower = this.extraOptions.indexOf('Bower') > -1 ? true : false;
        var npm = (this.extraOptions.indexOf('Gulp') > -1 || this.extraOptions.indexOf('Grunt') > -1)  ? true : false;

        if (bower || npm) {
          this.installDependencies({
            bower: bower,
            npm: npm
          });
        }
      }
    });
  }
});

DrupalThemeExtrasGenerator.prototype.askFor = function () {
  var cb = this.async();

  var config = this.config.getAll();

  for (var i in config) {
    this[i] = config[i];
  }

  if (!this.options.nested) {
    console.log(this.yeoman);
    var prompts = extras.askFor();

    this.prompt(prompts, function (props) {

      this.extraOptions = props.extraOptions;

      cb();
    }.bind(this));
  }
  else {
    this.extraOptions = this.options.extraOptions;
    this.destinationRoot(this.projectSlug);
    cb();
  }
};

DrupalThemeExtrasGenerator.prototype.addTheThings = function () {
  if (this.extraOptions.indexOf('Bower') > -1) {
    this.template('_bower.json', 'bower.json');
  }

  if (this.extraOptions.indexOf('Gulp') > -1) {
    this.template('_gulp.package.json', 'package.json');
    this.template('Gulpfile.js', 'Gulpfile.js');
  }

  if (this.extraOptions.indexOf('Grunt') > -1) {
      this.template('_grunt.package.json', 'package.json');
      this.template('Gruntfile.js', 'Gruntfile.js');
  }
}

module.exports = DrupalThemeExtrasGenerator;