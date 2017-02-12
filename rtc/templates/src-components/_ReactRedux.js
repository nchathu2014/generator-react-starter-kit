import React,{Component,PropTypes} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class <%=className%> extends Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this._init<%=className%>();
        this.state = {};
    }

    /**
     *
     * @private
     */
    _init<%=className%>() {
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
            <div>Hi I am _ReactRedux Component (React Redux) </div>
        );
    }
}

/**
 *
 * @type {{}}
 */
<%=className%>.propTypes = {};

/**
 *
 * @type {{}}
 */
<%=className%>.defaultProps = {};

/**
 *
 * @param state
 * @returns {{state: *}}
 */
function mapStateToProps(state) {
    return {
        state: state
    };
}

/**
 *
 * @param dispatch
 * @returns {{actions: *}}
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(<%=className%>);