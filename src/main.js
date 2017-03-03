import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { RouteMap } from 'config/Routes';
import App from 'components/App';
import Home from 'components/pages/Home';
import About from 'components/pages/About';
import Something from 'components/pages/Something';

import 'sass/main.scss';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path={RouteMap.About.path} component={About}/>
      <Route path={RouteMap.Something.path} component={Something}/>
    </Route>
  </Router>
), document.getElementById('app'));