import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import BasicLayout from './layouts/BasicLayout';
import DetailsPage from './layouts/DetailsPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/main" exact component={BasicLayout} />
        <Route path="/main/article" component={DetailsPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
