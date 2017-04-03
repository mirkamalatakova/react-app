import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import { RouteMap } from 'config/Routes';
import App from 'components/App';
import Home from 'components/pages/Home';
import About from 'components/pages/About';
import Something from 'components/pages/Something';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import weather from 'redux/modules/weather';

import 'sass/main.scss';

const reducers = combineReducers({ weather });

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk),
));

render((
  <Provider store={store}>
	  <Router history={browserHistory}>
	    <Route path="/" component={App}>
	      <IndexRoute component={Home}/>
	      <Route path={RouteMap.About.path} component={About}/>
	      <Route path={RouteMap.Something.path} component={Something}/>
	    </Route>
	  </Router>
  </Provider>
), document.getElementById('app'));