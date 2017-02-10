/*eslint-disable import/default*/
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import <%=appName%> from './components/<%=appName%>';
import './styles/styles.css';

const store = configureStore();

render(
    <Provider store={store}>
        <<%=appName%>/>
    </Provider>,
    document.getElementById('app')
);
