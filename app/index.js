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
    }

    /**
     * 2.Where you prompt users for options (where you'd call this.prompt())
     */
    prompting(){
        this.log("Prompting....");
    }

    /**
     * 3.Saving configurations and configure the project
     * (creating .editorconfig files and other metadata files)
     */
    configuring(){
        this.log("Configuring...");
    }

    /**
     * 4.If the method name doesn't match a priority, it will be pushed to this group.
     */
    default(){
        this.log("Default...");
    }

    /**
     * 5.Where you write the generator specific files (routes, controllers, etc)
     */
    writing(){
        this.log("Writing...");
    }

    /**
     * Where conflicts are handled (used internally)
     */
    conflicts(){
        this.log("Conflicts...");
    }

    /**
     * Where installation are run (npm, bower)
     */
    install(){
        this.log("Install...");
    }

    /**
     * Called last, cleanup, say good bye, etc
     */
    end(){
        this.log("End...");
    }

    /**
     * Custom method
     */
    myCustomMethod(){
        this.log("**** My Custom Method fires ***");
    }

};