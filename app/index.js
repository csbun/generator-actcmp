'use strict';
// var util = require('util');
var path = require('path');
var generators = require('yeoman-generator');
var chalk = require('chalk');
var changeCase = require('change-case');


var ActcmpGenerator = generators.Base.extend({
  constructor: function() {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);
  },

  init: function () {
    this.pkg = require(path.join(__dirname, '../package.json'));
  },

  askFor: function () {
    var done = this.async(),
        destBasePath = (this.appname || '').split(/[\/\\: ]/),
        defaultCmpName = (destBasePath[destBasePath.length - 1] || 'my-cmp').replace(/^cmp\-/, '');

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the Component-Generator.'));

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
        // 组件构造函数名，camel 命名方式，在 example/bootstrap.js 中使用
        this.cmpCamelName = changeCase.camelCase(cmpName);
        // git 用户名
        this.gitName = this.user.git.name();
        this.gitEmail = this.user.git.email();
        done();
      } else {
        console.log(chalk.magenta('Oops!! the Component Name is required!'));
      }
    }.bind(this));
  },

  app: function () {
    this.template('example/_index.html', 'example/index.html');
    this.template('example/_bootstrap.js', 'example/bootstrap.js');

    this.directory('server', 'server');

    this.template('_bower.json', 'bower.json');
    this.template('_index.js', 'index.js');
    this.template('_package.json', 'package.json');
    this.template('_README.md', 'README.md');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('jshintrc', '.jshintrc');
  },

  end: function () {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }

});

module.exports = ActcmpGenerator;
