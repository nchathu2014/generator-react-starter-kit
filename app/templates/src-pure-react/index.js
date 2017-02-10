/*eslint-disable import/default*/
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import <%=appName%> from './components/<%=appName%>';



render(<<%=appName%>/>,
  document.getElementById('app')
);
