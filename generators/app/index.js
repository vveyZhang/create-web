'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
var _ = require('lodash');
module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    this.option('help', {
      type: Boolean,
      alias: 'h',
      description: 'help'
    });
    this.option('skip-cache', {
      type: Boolean,
      hide: true
    });
    this.option('skip-install', {
      type: Boolean,
      description: '跳过安装依赖'
    });
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.red('create-web')
    ));
    const prompts = [{
      type: 'input',
      name: 'name',
      message: "project's name:"
    },
    {
      type: 'input',
      name: 'describe',
      message: 'describe:'
    }
      ,
    {
      type: 'input',
      name: 'author',
      message: 'author:'
    },
    {
      type: 'confirm',
      name: 'mobile',
      message: 'is it a mobile end project ?',
      default: false
    }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = { ...this.props, ...props };
      mkdirp(this.props.name);
      this.destinationRoot(this.props.name);
    });
  }

  writing() {
    // config
    var pkg = this.fs.readJSON(this.templatePath('config/package.json'), {});
    pkg.keywords = ['vvey-web', 'generator', this.props.name];
    pkg.name = this.props.name;
    pkg.description = this.props.describe;
    pkg.author = this.props.author;
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    this.fs.copyTpl(
      this.templatePath('config/.babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.copyTpl(
      this.templatePath('config/postcss.config.js'),
      this.destinationPath('postcss.config.js')
    );
    this.fs.copyTpl(
      this.templatePath('config/gitignore.txt'),
      this.destinationPath('.gitignore')
    );
    var readmeTmpl = _.template(this.fs.read(this.templatePath('config/README.md')));
    this.fs.write(this.destinationPath('README.md'), readmeTmpl({
      name: this.props.name,
      describe: this.props.describe
    }));
    // config --end

    // js css
    mkdirp('src/components');
    mkdirp('src/css');
    mkdirp('src/lib');
    mkdirp('src/images');
    // mkdirp('config');
    // css
    this.fs.copyTpl(
      this.templatePath('css/common.less'),
      this.destinationPath('src/css/common.less')
    );
    this.fs.copyTpl(
      this.templatePath('css/theme.less'),
      this.destinationPath('src/css/theme.less')
    );
    // is mobile 
    if (this.options.mobile) {
      this.fs.copyTpl(
        this.templatePath('lib/_adapter.js'),
        this.destinationPath('src/lib/adapter.js')
      );
      this.fs.copyTpl(
        this.templatePath('html/index-mobile.html'),
        this.destinationPath('src/index.html')
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('html/index.html'),
        this.destinationPath('src/index.html')
      );
    };
    // js css --end
    this.fs.copyTpl(
      this.templatePath('app.js'),
      this.destinationPath('src/index.js')
    );
    this.fs.append(
      this.destinationPath('src/index.js'),
      'import "./css/common.less"'
    );

    // webpack 
    this.fs.copyTpl(
      this.templatePath('webpack/helper.js'),
      this.destinationPath('config/helper.js')
    );
    this.fs.copyTpl(
      this.templatePath('webpack/webpack.common.js'),
      this.destinationPath('config/webpack.common.js')
    );
    this.fs.copyTpl(
      this.templatePath('webpack/webpack.dev.js'),
      this.destinationPath('config/webpack.dev.js')
    );
    this.fs.copyTpl(
      this.templatePath('webpack/webpack.pro.js'),
      this.destinationPath('config/webpack.pro.js')
    );
    this.fs.copyTpl(
      this.templatePath('webpack/webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
  }

  install() {
    this.installDependencies();
  }
};
