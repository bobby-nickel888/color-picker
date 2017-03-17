import React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';

import App from './components/App';
import NotFoundView from './views/NotFoundView';

import GradientFormComponent from './containers/GradientFormComponent/GradientFormComponent';

export default (
	<Route path='/' component={App}>
		<IndexRedirect to="gradientForm" />
		<Route path="gradientForm" component={GradientFormComponent} />
		<Route path="404" component={NotFoundView} />
		<Redirect from="*" to="404" />
	</Route>
);