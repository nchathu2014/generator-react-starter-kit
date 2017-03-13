/**
 * Created by Nuwan Chathuranga T.D on 2/7/2017.
 */

'use strict';
var Generator = require('yeoman-generator'),
    _ = require('lodash'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    fs = require('fs'),
    appConfig = require('./config/config');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        this.appname = this._formatAppName(this.appname);
        this.packageJSON = appConfig.config.dependencies.packageJSON;

        //declare the context object
        this.context = {
            "components": "components",
            "constant": "constant",
            "images": "img",
            "actions": "actions",
            "reducer": "reducer",
            "store": "store",
            "styles": "styles",
            "indexHTML": "index.html",
            "indexJS": "index.js"
        };

        this.commonDependencies = {
            "redux": {
                dependencies: appConfig.config.appInfo.changeDependencies.redux.dependencies,
                devDependencies: appConfig.config.appInfo.changeDependencies.redux.devDependencies
            }
        }
    }





    /**
     * 1.Your initialization methods (checking current project state, getting configs, etc)
     */
    initializing() {






        this._showInitMessage();
        this.log(yosay(
            chalk.yellow("Hi...!\n") +
            chalk.yellow("Share your ideas with me\n") +
            chalk.red("twitter:@dchatnu")));

        //Initialize the project dependencies
        this.dependencies = [
            'gitignore',
            'babelrc',
            'editorconfig',
            'eslintrc',
            '_README.md',
            '_webpack.config.dev.js',
            '_webpack.config.prod.js'
        ];

    }

    /**
     * 2.Where you prompt users for options (where you'd call this.prompt())
     */
    prompting() {

        return this.prompt([
            {
                type: 'input',
                name: 'appname',
                message: "Name your root component:D ?",
                default: _.kebabCase(this.appname)
            },
            {
                type: 'rawlist',
                name: 'apptype',
                message: 'Select your React application type ?',
                choices: [
                    {
                        name: 'Pure ReactJS',
                        value: appConfig.config.appType.pureReact,
                        checked: true
                    },
                    {
                        name: 'React+Redux',
                        value: appConfig.config.appType.reactRedux,
                        checked: false
                    }
                ]
            },
            {
                type: 'rawlist',
                name: 'styleframework',
                message: 'Select your style framework ?',
                choices: [
                    {
                        name: 'Bootstrap (V3)',
                        value: appConfig.config.styles.framework.bootstrap,
                        checked: false
                    },
                    {
                        name: 'UX Framework (Pearson)',
                        value: appConfig.config.styles.framework.uxframework,
                        checked: false
                    },
                    {
                        name: 'Other',
                        value: appConfig.config.styles.framework.other,
                        checked: false
                    }

                ]

            }
        ]).then((answers)=> {
            this.appname = this._formatAppName(answers.appname);
            this.apptype = answers.apptype;
            this.styleframework = answers.styleframework;
            this.styletype = answers.styletype;
            this.config.set('userSelectedAppType',answers.apptype);
            this.config.save();
        });

    }

    /**
     * 3.Saving configurations and configure the project
     * (creating .editorconfig files and other metadata files)
     */
    configuring() {
        //var packageJson = this.packageJSON;

        this.packageJSON.name = _.kebabCase(this.appname);
        this.packageJSON.version = appConfig.config.appInfo.version;

        //Select the description message based on the application type
        if (this.apptype === appConfig.config.appType.pureReact) {
            this.packageJSON.description = appConfig.config.appInfo.descriptionPureReact;
        }
        if (this.apptype === appConfig.config.appType.reactRedux) {
            this.packageJSON.description = appConfig.config.appInfo.descriptionReactRedux;
        }

        this.packageJSON.scripts = {
            "prestart": "babel-node tools/startMessage.js",
            "start": "npm-run-all --parallel  test:watch open:src lint:watch",
            "open:src": "babel-node tools/srcServer.js",
            "lint": "node_modules/.bin/esw webpack.config.* src tools",
            "lint:watch": "npm run lint -- --watch",
            "test": "mocha --reporter spec tools/testSetup.js test/**/*.test.js",
            "test:watch": "npm run test -- --watch",
            "clean-dist": "npm run remove-dist && mkdir dist",
            "remove-dist": "node_modules/.bin/rimraf ./dist ",
            "build:html": "babel-node tools/buildHtml.js",
            "prebuild": "npm-run-all clean-dist test  build:html",
            "build": "babel-node  tools/build.js",
            "postbuild": "babel-node tools/distServer.js"
        };
        this.packageJSON.author = appConfig.config.appInfo.author;
        this.packageJSON.license = appConfig.config.appInfo.license;

        this.packageJSON.dependencies = {
            "babel-polyfill": "6.8.0",
            "react": "15.0.2",
            "react-dom": "15.0.2"
        };

        //Select the dependencies based on the application type (react or react-redux)
        if (this.apptype === appConfig.config.appType.reactRedux) {
            this.packageJSON.dependencies = Object.assign(
                {},
                this.packageJSON.dependencies,
                this.commonDependencies.redux.dependencies
            )
        }

        this.packageJSON.devDependencies = {
            "babel-cli": "6.8.0",
            "babel-core": "6.8.0",
            "babel-loader": "6.2.4",
            "babel-plugin-react-display-name": "2.0.0",
            "babel-preset-es2015": "6.6.0",
            "babel-preset-react": "6.5.0",
            "babel-preset-react-hmre": "1.1.1",
            "babel-register": "6.8.0",
            "jquery": "2.2.3",
            "colors": "1.1.2",
            "compression": "1.6.1",
            "cross-env": "1.0.7",
            "css-loader": "0.23.1",
            "node-sass": "^3.12.2",
            "sass-loader": "^4.0.2",
            "enzyme": "2.2.0",
            "eslint": "2.9.0",
            "eslint-plugin-import": "1.6.1",
            "eslint-plugin-react": "5.0.1",
            "eslint-watch": "2.1.11",
            "eventsource-polyfill": "0.9.6",
            "expect": "1.19.0",
            "express": "4.13.4",
            "extract-text-webpack-plugin": "1.0.1",
            "file-loader": "^0.8.5",
            "jsdom": "8.5.0",
            "mocha": "2.4.5",
            "nock": "8.0.0",
            "npm-run-all": "1.8.0",
            "open": "0.0.5",
            "react-addons-test-utils": "15.0.2",
            "rimraf": "2.5.2",
            "style-loader": "0.13.1",
            "url-loader": "0.5.7",
            "webpack": "1.13.0",
            "webpack-dev-middleware": "1.6.1",
            "webpack-hot-middleware": "2.10.0"
        };

        //Select the devDependencies based on the application type (react or react-redux)
        if (this.apptype === appConfig.config.appType.reactRedux) {
            this.packageJSON.devDependencies = Object.assign(
                {},
                this.packageJSON.devDependencies,
                this.commonDependencies.redux.devDependencies
            )
        }

        /**
         * Set style framework to the dependency list
         */
        this._setStyleFrameworkDependencies(this.styleframework);

        this.packageJSON.repository = {
            "type": "git",
            "url": "git url goes here"
        };

        this.fs.writeJSON('package.json', this.packageJSON);
    }


    /**
     * Get the user selection style framework Bootstrap,Foundation(Zerb) and UX-Framework(Pearson) and
     * configure the dependencies align to it
     * @param framework
     * @private
     */
    _setStyleFrameworkDependencies(framework){
        switch(framework){
            case appConfig.config.styles.framework.bootstrap:
                this.packageJSON.devDependencies = Object.assign({},this.packageJSON.devDependencies,{
                    "bootstrap": appConfig.config.appInfo.changeDependencies.styleFramework.bootstrap
                });
                break;

            case appConfig.config.styles.framework.uxframework:
                this.packageJSON.devDependencies = Object.assign({},this.packageJSON.devDependencies,{
                    "pearson-elements": appConfig.config.appInfo.changeDependencies.styleFramework.pearsonElements
                });
                break;

            case appConfig.config.styles.framework.other:
                break;

            default:break;
        }
    }

    /**
     * 4.If the method name doesn't match a priority, it will be pushed to this group.
     */
    default() {
    }

    /**
     * 5.Where you write the generator specific files (routes, controllers, etc)
     */
    writing() {

        this._copyRootDependencies();
        this._copySrcFolder();
        this._copyToolsFolder();
        this._copyTestFolder();
    }

    /**
     * Where conflicts are handled (used internally)
     */
    conflicts() {
    }

    /**
     * Where installation are run (npm, bower)
     */
    install() {
     this.installDependencies();
    }

    /**
     * Called last, cleanup, say good bye, etc
     */
    end() {
        this.log("=============================================================================");
        this.log(chalk.green('React Starer Kit Successfully Installed'));
        this.log("=============================================================================");
        this.log(chalk.red("Running instructions:"));
        this.log("npm run start [-s] -> To run the developer version");
        this.log("npm run build [-s] -> To run the production version");
        this.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    }


    /**
     * Custom methods
     */

    _clearFolder(folderName) {
        if (folderName) {
            this.fs.delete(this.destinationPath(folderName) + '/');
        }

    }

    /**
     * COPY REACT REDUX RESOURCES
     * @private
     */
    _copyReactRedux() {
        var reactReduxContext = this._getReactReduxContext();

        this.fs.copyTpl(
            this.templatePath(appConfig.config.path.reactRedux.templatePath + '/' + reactReduxContext.indexHTML),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath + '/' + reactReduxContext.indexHTML),
            {
                appName: _.startCase(this.appname)
            }
        );

        this.fs.copyTpl(
            this.templatePath(appConfig.config.path.reactRedux.templatePath + '/' + reactReduxContext.indexJS),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath + '/' + reactReduxContext.indexJS),
            {
                appName: this._formatAppName(this.appname),
                styleFramework: this.styleframework
            }
        );

        this.fs.copyTpl(
            this.templatePath(appConfig.config.path.reactRedux.templatePath + '/' + reactReduxContext.components + '/' + 'RootComponent.js'),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath + '/' + reactReduxContext.components + '/' + this.appname + '.js'),
            {
                appName: this.appname,
                styleFramework:this.styleframework
            }
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.reactRedux.templatePath + '/' + reactReduxContext.constant),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath + '/' + reactReduxContext.constant)
        );


        this.fs.copy(
            this.templatePath(appConfig.config.path.reactRedux.templatePath + '/' + reactReduxContext.actions),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath + '/' + reactReduxContext.actions)
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.reactRedux.templatePath + '/' + reactReduxContext.store),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath + '/' + reactReduxContext.store)
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.reactRedux.templatePath + '/' + reactReduxContext.reducer),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath + '/' + reactReduxContext.reducer)
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.reactRedux.templatePath + '/' + reactReduxContext.images),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath + '/' + reactReduxContext.images)
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.pureReact.templatePath + '/' + reactReduxContext.styles+'/'+'scss'),
            this.destinationPath(appConfig.config.path.pureReact.destinationPath + '/' + reactReduxContext.styles+'/'+'scss')
        );

        if(this.styleframework === 'uxframework'){
            this.fs.copy(
                this.templatePath(appConfig.config.path.pureReact.templatePath + '/' + reactReduxContext.styles+'/'+'main-ux-frmwrk.scss'),
                this.destinationPath(appConfig.config.path.pureReact.destinationPath + '/' + reactReduxContext.styles+'/'+'main.scss')
            );
        }else{
            this.fs.copy(
                this.templatePath(appConfig.config.path.pureReact.templatePath + '/' + reactReduxContext.styles+'/'+'main.scss'),
                this.destinationPath(appConfig.config.path.pureReact.destinationPath + '/' + reactReduxContext.styles+'/'+'main.scss')
            );
        }
    }


    /**
     * COPY PURE REACT RESOURCES
     * @private
     */
    _copyPureReact() {
        var pureReactContext = this._getPureReactContext();
        this.fs.copyTpl(
            this.templatePath(appConfig.config.path.pureReact.templatePath + '/' + pureReactContext.indexHTML),
            this.destinationPath(appConfig.config.path.pureReact.destinationPath + '/' + pureReactContext.indexHTML),
            {
                appName: _.startCase(this.appname)
            }
        );

        this.fs.copyTpl(
            this.templatePath(appConfig.config.path.pureReact.templatePath + '/' + pureReactContext.indexJS),
            this.destinationPath(appConfig.config.path.pureReact.destinationPath + '/' + pureReactContext.indexJS),
            {
                appName: this._formatAppName(this.appname),
                styleFramework: this.styleframework
            }
        );

        this.fs.copyTpl(
            this.templatePath(appConfig.config.path.pureReact.templatePath + '/' + pureReactContext.components + '/' + 'RootComponent.js'),
            this.destinationPath(appConfig.config.path.pureReact.destinationPath + '/' + pureReactContext.components + '/' + this._formatAppName(this.appname) + '.js'),
            {
                appName: this._formatAppName(this.appname),
                styleFramework:this.styleframework
            }
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.pureReact.templatePath + '/' + pureReactContext.constant),
            this.destinationPath(appConfig.config.path.pureReact.destinationPath + '/' + pureReactContext.constant)
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.pureReact.templatePath + '/' + pureReactContext.images),
            this.destinationPath(appConfig.config.path.pureReact.destinationPath + '/' + pureReactContext.images)
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.pureReact.templatePath + '/' + pureReactContext.styles+'/'+'scss'),
            this.destinationPath(appConfig.config.path.pureReact.destinationPath + '/' + pureReactContext.styles+'/'+'scss')
        );

        if(this.styleframework === 'uxframework'){
            this.fs.copy(
                this.templatePath(appConfig.config.path.pureReact.templatePath + '/' + pureReactContext.styles+'/'+'main-ux-frmwrk.scss'),
                this.destinationPath(appConfig.config.path.pureReact.destinationPath + '/' + pureReactContext.styles+'/'+'main.scss')
            );
        }else{
            this.fs.copy(
                this.templatePath(appConfig.config.path.pureReact.templatePath + '/' + pureReactContext.styles+'/'+'main.scss'),
                this.destinationPath(appConfig.config.path.pureReact.destinationPath + '/' + pureReactContext.styles+'/'+'main.scss')
            );
        }
    }

    /**
     *
     * @private
     */
    _copySrcFolder() {
        this._clearFolder('src');
        if (this.apptype === appConfig.config.appType.pureReact) {
            this._copyPureReact();
        } else {
            this._copyReactRedux();
        }
    }

    /**
     *
     * @private
     */
    _copyToolsFolder() {
        this.fs.copyTpl(
            this.templatePath('tools'),
            this.destinationPath('tools')
        );
    }

    /**
     *
     * @private
     */
    _copyTestFolder() {
        this.fs.copyTpl(
            this.templatePath('test'),
            this.destinationPath('test')
        );
    }

    /**
     *
     * @private
     */
    _copyRootDependencies() {
        for (var i = 0; i < this.dependencies.length; i++) {
            if (this.dependencies[i].substring(0, 1) === '_') {
                this.fs.copy(
                    this.templatePath(this.dependencies[i]),
                    this.destinationPath(this.dependencies[i].substring(1))
                );
            } else {
                this.fs.copy(
                    this.templatePath(this.dependencies[i]),
                    this.destinationPath('.' + this.dependencies[i])
                );
            }

        }
    }


    _showInitMessage() {
        this.log(chalk.white("==============================================================================================="));
        this.log(chalk.bgWhite("                                                                                               "));
        this.log(chalk.bgWhite.black('                          ' + appConfig.config.messages.welcome + ' [' + appConfig.config.version + ']' + '                                         '));
        this.log(chalk.bgWhite("                                                                                               "));
        this.log(chalk.white("==============================================================================================="));
    }


    _getPureReactContext() {
        return {
            "constant": this.context.constant,
            "components": this.context.components,
            "images": this.context.images,
            "styles": this.context.styles,
            "indexHTML": this.context.indexHTML,
            "indexJS": this.context.indexJS
        }
    }

    _getReactReduxContext() {
        return {
            "constant": this.context.constant,
            "components": this.context.components,
            "actions": this.context.actions,
            "reducer": this.context.reducer,
            "store": this.context.store,
            "images": this.context.images,
            "styles": this.context.styles,
            "indexHTML": this.context.indexHTML,
            "indexJS": this.context.indexJS
        }
    }

    _formatAppName(appName){
        return  _.startCase(appName).replace(/\s/g, '')
    }



};