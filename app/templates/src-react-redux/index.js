/*eslint-disable import/default*/
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import <%=appName%> from './components/<%=appName%>';
<%if(styleFramework === "bootstrap"){%>import '../node_modules/bootstrap/dist/css/bootstrap.min.css';<%}%>
<%if(styleFramework === "uxframework"){%>import '../node_modules/pearson-elements/scss/elements.scss';<%}%>

const store = configureStore();

render(
    <Provider store={store}>
        <<%=appName%>/>
    </Provider>,
    document.getElementById('app')
);
