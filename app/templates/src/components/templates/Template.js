import React, { PropTypes } from 'react';
import logo from 'file!../../images/welcome.jpg';

const Template = (props) => {
    return (
        <div>
          <h1>React + Redux Starter Kit</h1>
          <h3>{"{ "}<br/><b>{"message : "}</b>{props.message}<br/>{" }"}</h3>
          <img src={logo} alt=""/>
        </div>
    );
}

Template.propTypes = {}

export default Template;
