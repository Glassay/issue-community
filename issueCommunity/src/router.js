import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import LoginLayout from './layouts/LoginLayout';
import BasicLayout from './layouts/BasicLayout';
import DetailsPage from './layouts/DetailsPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={LoginLayout} />
        <Route path="/main" exact component={BasicLayout} />
        <Route path="/main/article" component={DetailsPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
