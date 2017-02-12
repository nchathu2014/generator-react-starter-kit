import React, { PropTypes } from 'react';

/**
 *
 * @returns {XML}
 * @constructor
 */
const <%=className%> = () => {

    /**
     *
     */
    const _init<%=className%> = () => {
        console.log("Hi I am Sample Function");
    };

    /**
     * IIFE
     */
    (()=> {
    _init<%=className%>();
    })();

    return (
        <div>I am TestRTC Component (Stateless Functional)</div>
    );
};

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