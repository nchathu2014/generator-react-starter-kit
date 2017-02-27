/*eslint-disable import/default*/
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
<%if(styleFramework === "bootstrap"){%>import '../node_modules/bootstrap/dist/css/bootstrap.min.css';<%}%>
<%if(styleFramework === "uxframework"){%>import '../node_modules/pearson-elements/scss/elements.scss';<%}%>
import <%=appName%> from './components/<%=appName%>';

render(<<%=appName%>/>,
  document.getElementById('app')
);
