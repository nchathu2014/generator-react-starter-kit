import React,{Component,PropTypes} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as testActions from '../redux/actions/testActions';
import Template from './templates/Template';

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

  handleOnClick(){

    let passingMessage=this.refs.inputRef.value;
    this.props.actions.testLoadSuccess(passingMessage);
    this.refs.inputRef.value = "";
    this.setState({
      onChangeText:""
    });
  }

    render() {
      let {message} = this.props;
        return (
            <div>
            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-group"
                    id="textInput"
                    ref="inputRef"
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-lg btn-success"
                    value="Change the Redux Store By Clicking..."
                    disabled={this.state.onChangeText? false:true}
                    onClick={this.handleOnClick}
                  />
                </div>

              </div>
            </div>
            <Template message={message}/>

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
