import React,{Component,PropTypes} from "react";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as testActions from './../actions/testActions';

class DynamicCanvas extends Component {

    constructor(props, context) {
        super(props, context);
        this.bindFunctions();
        this.state={
          onChangeText:""
        }

    }

  bindFunctions(){
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);

  }

  handleOnChange(event){
    console.log(event.target.value);
    this.setState({
      onChangeText:event.target.value
    });
  }



    render() {
      let {message} = this.props;
        return (
            <div className="content" style={{textAlign:'center'}}>
                <h1 style={{color:'#fff'}}>
                    Welcome to React+Redux Starter Kit
                </h1>
                <h2 style={{color:'aqua'}}>[v1.0.0]</h2>
            </div>
        );
    }
}

DynamicCanvas.propTypes = {
    //myProp:PropTypes.string.isRequired
};



function mapStateToProps(state) {
    return {
        message: state.testObj
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(testActions, dispatch)
    };
}




export default connect(mapStateToProps,mapDispatchToProps)(DynamicCanvas);


