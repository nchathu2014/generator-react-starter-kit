import React, { PropTypes } from 'react';
<% if(apptype != "Pure ReactJS"){ %>
import logo from 'file!../../images/welcome.jpg';
<% } %>


const Template = (props) => {
    return (
        <div>
            <% if(apptype != "Pure ReactJS"){ %>
                 <h1>React + Redux Starter Kit</h1>
                 <h3>{"{ "}<br/><b>{"message : "}</b>{props.message}<br/>{" }"}</h3>
                 <img src={logo} alt=""/>
            <% } else {%>
                <h1>Pure ReactJS Application</h1>
            <%}%>
       </div>
    );
}

Template.propTypes = {}

export default Template;
