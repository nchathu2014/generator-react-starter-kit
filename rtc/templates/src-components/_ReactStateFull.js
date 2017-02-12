import React, {PropTypes,Component} from 'react';

class <%=className%> extends Component {

    /**
     * _ReactStateFull constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this._init<%=className%>();
        this.state = {};
    }

    /**
     * Custom Function - Method binding to 'this'
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
            <div>Hi I am Component (State Full)</div>
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

export default <%=className%>;