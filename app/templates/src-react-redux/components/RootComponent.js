import React,{Component,PropTypes} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as testActions from './../actions/testActions';

class <%=appName%> extends Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this._init<%=appName%>();
        this.state = {};
    }

    /**
     *
     * @private
     */
    _init<%=appName%>() {
        //bind custom function here
    }

    /**
     * Life Cycle function - componentWillMount
     */
    componentWillMount() {
    }

    /**
     * Life Cycle function - componentDidMount
     */
    componentDidMount() {
    }

    /**
     * Life Cycle function - componentWillReceiveProps
     * @param newProps
     */
    componentWillReceiveProps(newProps) {
    }

    /**
     * Life Cycle function - shouldComponentUpdate
     * @param newProps
     * @param newState
     * @returns {boolean}
     */
    shouldComponentUpdate(newProps, newState) {
        return true;
    }

    /**
     * Life Cycle function - componentWillUpdate
     * @param nextProps
     * @param nextState
     */
    componentWillUpdate(nextProps, nextState) {
    }

    /**
     * Life Cycle function - componentDidUpdate
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState) {
    }

    /**
     * Life Cycle function - componentWillUnmount
     */
    componentWillUnmount() {
    }

    /**
     * Life Cycle function - render
     * @returns {XML}
     */
    render() {
        return (
            <div className="content" style={{textAlign:'center'}}>
                <h1 style={{color:'#fff'}}>
    {this.props.message}
                </h1>
                <h2 style={{color:'aqua'}}>[v1.0.0]</h2>
            </div>
        );
    }
}

/**
 *
 * @type {{}}
 */
<%=appName%>.propTypes = {};

/**
 *
 * @type {{}}
 */
<%=appName%>.defaultProps = {};

/**
 *
 * @param state
 * @returns {{state: *}}
 */
function mapStateToProps(state) {
    return {
        state: state,
        message:state.testObj
    };
}

/**
 *
 * @param dispatch
 * @returns {{actions: *}}
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(testActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(<%=appName%>);