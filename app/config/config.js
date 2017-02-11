module.exports = {
    "config":{
        "appInfo":{
            "author":"Nuwan Chathuranga T.D",
             "version":'1.0.0',
             "license":"MIT",
             "descriptionPureReact":"This is a starter kit of pure-react",
             "descriptionReactRedux":"This is a starter kit of react-redux",
             "changeDependencies":{
                "redux":{
                    "dependencies":{
                        "redux": "3.5.2",
                        "react-redux": "4.4.5"
                    },
                    "devDependencies":{
                        "redux-immutable-state-invariant": "1.2.3",
                        "redux-mock-store": "1.0.2"
                    }
                }
             }
        },
        "appType":{
            "pureReact":"Pure React",
            "reactRedux":"React Redux"
        },
        "messages":{
            "welcome":"Welcome to ReactJS Starter Kit"
        },
        "version":"v1.0.0",
        "path":{
            "pureReact":{
                "templatePath":"src-pure-react",
                "destinationPath":"src"
            },
            "reactRedux":{
                "templatePath":"src-react-redux",
                "destinationPath":"src"
            }
        },
        dependencies:{
            packageJSON:{
                name:'',
                version:'',
                description:'',
                scripts:{},
                author:'',
                dependencies:{},
                license:'',
                devDependencies:{},
                repository:{}
            },
            bowerJSON:{},
            yarn:{}
        }
    }
};