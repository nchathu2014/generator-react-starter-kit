/**
 * Created by Nuwan Chathuranga T.D on 2/7/2017.
 * FOLDER EKA MAKALA GAHANA EKE INDAN KARANNA PATAN GANNA
 */

'use strict';
var Generator = require('yeoman-generator'),
    _ = require('lodash'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    fs = require('fs'),
    appConfig=require('./config/config');

module.exports = class extends Generator{

    constructor(args,opts){
        super(args,opts);
        this.appname = _.kebabCase(this.appname);

        //declare the context object
        this.context={
            "components":"components",
            "constant":"constant",
            "images":"img",
            "actions":"actions",
            "reducer":"reducer",
            "store":"store",
            "styles":"styles",
            "indexHTML":"index.html",
            "indexJS":"index.js"
        }
    }

    /**
     * 1.Your initialization methods (checking current project state, getting configs, etc)
     */
    initializing(){
        this._showInitMessage();
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
    prompting(){

        return this.prompt([
            {
                type:'input',
                name:'appname',
                message:"What is your app name ?",
                default:this.appname
            },
            {
                type:'rawlist',
                name:'apptype',
                message:'Select your React application type ?',
                choices:[
                    {
                        name:'Pure ReactJS',
                        value:appConfig.config.appType.pureReact,
                        checked:true
                    },
                    {
                        name:'React+Redux',
                        value:'React+Redux',
                        checked:false
                    }
                ]
            }
        ]).then((answers)=>{
           // this.log(answers);
            this.appname = answers.appname;
            this.apptype = answers.apptype;

           // this.log(_.camelCase(answers.appname));
            //this.log(this.apptype);
        });

    }

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
        this.log("=============================================================================");
        this.log(chalk.red('React Starer Kit ')+" "+chalk.green('Successfully Installed'));
        this.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    }



    /**
     * Custom methods
     */

    _clearFolder(folderName){
        if(folderName){
            this.fs.delete(this.destinationPath(folderName)+'/');
        }

    }


   /* _copyCommonFiles(){
        this.fs.copyTpl(
            this.templatePath('src/index.html'),
            this.destinationPath('src/index.html'),
            {
                appname:this.appname
            }
        );

        this.fs.copyTpl(
            this.templatePath('src/index.js'),
            this.destinationPath('src/index.js'),
            {
                appname:this.appname,
                apptype:this.apptype
            }
        );

        this.fs.copyTpl(
            this.templatePath('src/components/templates/Template.js'),
            this.destinationPath('src/components/templates/Template.js'),
            {
                apptype:this.apptype
            }
        );

        this.fs.copyTpl(
            this.templatePath('src/components/RootComponent.js'),
            this.destinationPath('src/components/'+this.appname+'.js'),
            {
                apptype:this.apptype
            }
        );

        this.fs.copy(
            this.templatePath('src/images'),
            this.destinationPath('src/images')
        );

        this.fs.copy(
            this.templatePath('src/styles'),
            this.destinationPath('src/styles')
        );
    }*/

    /*_copyReactRedux(){
        this.fs.copy(
            this.templatePath('src/redux'),
            this.destinationPath('src/redux')
        );

        this.fs.copy(
            this.templatePath('src/constants'),
            this.destinationPath('src/constants')
        );

        this.fs.copy(
            this.templatePath('src/api'),
            this.destinationPath('src/api')
        );

        this._copyCommonFiles();
    }*/


    /**
     * COPY REACT REDUX RESOURCES
     * @private
     */
    _copyReactRedux(){
        var reactReduxContext = this._getReactReduxContext();

        this.fs.copyTpl(
            this.templatePath(appConfig.config.path.reactRedux.templatePath+'/'+reactReduxContext.indexHTML),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath+'/'+reactReduxContext.indexHTML),
            {
                appName:this.appname
            }
        );

        this.fs.copyTpl(
            this.templatePath(appConfig.config.path.reactRedux.templatePath+'/'+reactReduxContext.indexJS),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath+'/'+reactReduxContext.indexJS),
            {
                appName:this.appname
            }
        );

        this.fs.copyTpl(
            this.templatePath(appConfig.config.path.reactRedux.templatePath+'/'+reactReduxContext.components+'/'+'RootComponent.js'),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath+'/'+reactReduxContext.components+'/'+this.appname+'.js'),
            {
                appName:this.appname
            }
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.reactRedux.templatePath+'/'+reactReduxContext.constant),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath+'/'+reactReduxContext.constant)
        );


        this.fs.copy(
            this.templatePath(appConfig.config.path.reactRedux.templatePath+'/'+reactReduxContext.actions),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath+'/'+reactReduxContext.actions)
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.reactRedux.templatePath+'/'+reactReduxContext.store),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath+'/'+reactReduxContext.store)
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.reactRedux.templatePath+'/'+reactReduxContext.reducer),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath+'/'+reactReduxContext.reducer)
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.reactRedux.templatePath+'/'+reactReduxContext.images),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath+'/'+reactReduxContext.images)
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.reactRedux.templatePath+'/'+reactReduxContext.styles),
            this.destinationPath(appConfig.config.path.reactRedux.destinationPath+'/'+reactReduxContext.styles)
        );
    }


    /**
     * COPY PURE REACT RESOURCES
     * @private
     */
    _copyPureReact(){
        var pureReactContext = this._getPureReactContext();
        this.fs.copyTpl(
            this.templatePath(appConfig.config.path.pureReact.templatePath+'/'+pureReactContext.indexHTML),
            this.destinationPath(appConfig.config.path.pureReact.destinationPath+'/'+pureReactContext.indexHTML),
            {
                appName:this.appname
            }
        );

        this.fs.copyTpl(
            this.templatePath(appConfig.config.path.pureReact.templatePath+'/'+pureReactContext.indexJS),
            this.destinationPath(appConfig.config.path.pureReact.destinationPath+'/'+pureReactContext.indexJS),
            {
                appName:this.appname
            }
        );

        this.fs.copyTpl(
            this.templatePath(appConfig.config.path.pureReact.templatePath+'/'+pureReactContext.components+'/'+'RootComponent.js'),
            this.destinationPath(appConfig.config.path.pureReact.destinationPath+'/'+pureReactContext.components+'/'+this.appname+'.js'),
            {
                appName:this.appname
            }
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.pureReact.templatePath+'/'+pureReactContext.constant),
            this.destinationPath(appConfig.config.path.pureReact.destinationPath+'/'+pureReactContext.constant)
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.pureReact.templatePath+'/'+pureReactContext.images),
            this.destinationPath(appConfig.config.path.pureReact.destinationPath+'/'+pureReactContext.images)
        );

        this.fs.copy(
            this.templatePath(appConfig.config.path.pureReact.templatePath+'/'+pureReactContext.styles),
            this.destinationPath(appConfig.config.path.pureReact.destinationPath+'/'+pureReactContext.styles)
        );
    }

    /**
     *
     * @private
     */
    _copySrcFolder(){

       if(this.apptype === appConfig.config.appType.pureReact){
           this._clearFolder('src');
           this._copyPureReact();
       }else{
           this._clearFolder('src');
           this._copyReactRedux();
       }
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


    _showInitMessage(){
        this.log(chalk.white("===========*=======================================================================*==========="));
        this.log(chalk.bgWhite("                                                                                            "));
        this.log(chalk.bgWhite.black('              '+appConfig.config.messages.welcome+' ['+appConfig.config.version+']'+'                '));
        this.log(chalk.bgWhite("                                                                                               "));
        this.log(chalk.white("=============================================*================================================="));
    }


    _getPureReactContext(){
        return {
            "constant":this.context.constant,
            "components":this.context.components,
            "images":this.context.images,
            "styles":this.context.styles,
            "indexHTML":this.context.indexHTML,
            "indexJS":this.context.indexJS
        }
    }

    _getReactReduxContext(){
        return {
            "constant":this.context.constant,
            "components":this.context.components,
            "actions":this.context.actions,
            "reducer":this.context.reducer,
            "store":this.context.store,
            "images":this.context.images,
            "styles":this.context.styles,
            "indexHTML":this.context.indexHTML,
            "indexJS":this.context.indexJS
        }
    }

};