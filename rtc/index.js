/**
 * Created by Nuwan Chathuranga T.D on 2/7/2017.
 */

'use strict';
var Generator = require('yeoman-generator'),
    appConfig = require('./config/config'),
    _ = require('lodash');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        this.log(args[0]);
        this.name = args[0];
        //this.log(opts)
        //this.argument('appname',{type:String,required:true});
        //this.appname = _.kebabCase(this.options.appname);
    }

    /**
     * 1.Your initialization methods (checking current project state, getting configs, etc)
     */
    initializing() {

    }

    /**
     * 2.Where you prompt users for options (where you'd call this.prompt())
     */
    prompting() {
        var choicesList = [];
        var stateLessObj =  {
            name: 'React State-less Component ',
            value: appConfig.config.componentTypes.stateLess,
            checked: true
        };

        var stateFullObj =  {
            name: 'React State-full Component ',
            value: appConfig.config.componentTypes.stateFull,
            checked: false
        };

        var reactReduxObj =  {
            name: 'React-Redux Component ',
            value: appConfig.config.componentTypes.reactRedux,
            checked: false
        };

        if(this.config.get('userSelectedAppType') === 'Pure React'){
            choicesList = [stateLessObj,stateFullObj];
        }else{
            choicesList = [stateLessObj,stateFullObj,reactReduxObj];
        }

        return this.prompt([
            {
                type: 'rawlist',
                name: 'comptype',
                message: 'Select your React component type ?',
                choices: choicesList
            }
        ]).then((answers)=> {
            this.selCompType = answers.comptype;
        })

    }

    /**
     * 3.Saving configurations and configure the project
     * (creating .editorconfig files and other metadata files)
     */
    configuring() {
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
        var selComponentType = this._filterComponentType(this.selCompType);

       this.fs.copyTpl(
            this.templatePath('src-components/' + selComponentType),
            this.destinationPath('src/components/' + _.kebabCase(this.name) + '/' + this.name + '.js'),
            {
                className: this.name
            }
        )
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
    }

    /**
     * Called last, cleanup, say good bye, etc
     */
    end() {
    }

    /**
     * Custom method
     */
    _filterComponentType(selectedComponent) {



        var selComponentType = null;
        if (this.selCompType === appConfig.config.componentTypes.stateLess) {
            selComponentType = "_ReactStateLess.js"
        } else if (this.selCompType === appConfig.config.componentTypes.stateFull) {
            selComponentType = "_ReactStateFull.js"
        } else {
            selComponentType = "_ReactRedux.js"
        }

        return selComponentType;
    }

};