/**
 * Created by Nuwan Chathuranga T.D on 2/7/2017.
 */

'use strict';
var Generator = require('yeoman-generator'),
    _ = require('lodash'),
    chalk = require('chalk'),
    yosay = require('yosay');

module.exports = class extends Generator{

    constructor(args,opts){
        super(args,opts);
    }

    /**
     * 1.Your initialization methods (checking current project state, getting configs, etc)
     */
    initializing(){
        this.log("Initializing...");
        this.log(yosay("Hi..! "+
            chalk.yellow("I am Nuwan Chathuranga")+
            " and "+
            chalk.red("Welcome to Yeoman Learning")));

        //Initialize the project dependencies
        this.dependencies = [
            'gitignore',
            'babelrc',
            'editorconfig',
            'eslintrc',
            '_package.json',
            '_README.md',
            '_webpack.config.dev.js',
            '_webpack.config.prod.js'
        ];
    }

    /**
     * 2.Where you prompt users for options (where you'd call this.prompt())
     */
    prompting(){}

    /**
     * 3.Saving configurations and configure the project
     * (creating .editorconfig files and other metadata files)
     */
    configuring(){}

    /**
     * 4.If the method name doesn't match a priority, it will be pushed to this group.
     */
    default(){}

    /**
     * 5.Where you write the generator specific files (routes, controllers, etc)
     */
    writing(){

        this._copyRootDependencies();
        this._copySrcFolder();
        this._copyToolsFolder();
        this._copyTestFolder();
    }

    /**
     * Where conflicts are handled (used internally)
     */
    conflicts(){}

    /**
     * Where installation are run (npm, bower)
     */
    install(){
        //this.installDependencies();
    }

    /**
     * Called last, cleanup, say good bye, etc
     */
    end(){
        this.log("------------------------------^^^^^------------------------------------------");
        this.log(chalk.red('React Starer Kit ')+" "+chalk.green('Successfully Installed'));
        this.log("----------^^^---------------------------------------------------^^^----------");
    }

    /**
     * Custom methods
     */


    /**
     *
     * @private
     */
    _copySrcFolder(){
        this.fs.copyTpl(
            this.templatePath('src'),
            this.destinationPath('src')
        );
    }

    /**
     *
     * @private
     */
    _copyToolsFolder(){
        this.fs.copyTpl(
            this.templatePath('tools'),
            this.destinationPath('tools')
        );
    }

    /**
     *
     * @private
     */
    _copyTestFolder(){
        this.fs.copyTpl(
            this.templatePath('test'),
            this.destinationPath('test')
        );
    }

    /**
     *
     * @private
     */
    _copyRootDependencies(){
        for(var i=0;i<this.dependencies.length;i++){
            if(this.dependencies[i].substring(0,1) === '_'){
                this.fs.copy(
                    this.templatePath(this.dependencies[i]),
                    this.destinationPath(this.dependencies[i].substring(1))
                );
            }else{
                this.fs.copy(
                    this.templatePath(this.dependencies[i]),
                    this.destinationPath('.'+this.dependencies[i])
                );
            }

        }
    }

};