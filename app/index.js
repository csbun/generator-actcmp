'use strict';
// var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var changeCase = require('change-case');


var ActcmpGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async(),
        destBasePath = (this.src._destBase || '').split(/[\/\\: ]/),
        defaultCmpName = (destBasePath[destBasePath.length - 1] || 'my-cmp').replace(/^cmp\-/, '');

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the "UC Activity Component" generator.'));

    var prompts = [{
      name: 'cmpName',
      message: 'Would you like to call this component?',
      default: defaultCmpName
    }];

    this.prompt(prompts, function (props) {
      var cmpName = props.cmpName.toLowerCase() === 'y' ? defaultCmpName : props.cmpName;
      cmpName = cmpName.replace(/^cmp\-/, '').replace(/\s/g, '');
      if (cmpName) {
        // 组件名称，param 命名方式
        this.cmpName = changeCase.paramCase(cmpName);
        // 组件构造函数名，pascal 命名方式，在 example-tpl/cmp.js 中使用
        this.cmpConstructName = changeCase.pascalCase(cmpName);
        done();
      } else {
        console.log(chalk.magenta('Oops!! the Component Name is required!'));
      }
    }.bind(this));
  },

  app: function () {
    this.mkdir('src');

    this.mkdir('server');
    this.template('server/_app.js', 'server/app.js');

    this.directory('example', 'example');
    this.mkdir('example/js/cmp');
    this.template('example-tpl/index.html', 'example/index.html');
    this.template('example-tpl/bootstrap.js', 'example/js/bootstrap.js');
    this.template('example-tpl/cmp.js', 'example/js/cmp/' + this.cmpName + '.js');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_README.md', 'README.md');
    this.template('_Gruntfile.js', 'Gruntfile.js');
    this.copy('jshintrc', '.jshintrc');
  }

});

module.exports = ActcmpGenerator;
