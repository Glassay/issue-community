import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import LoginLayout from './layouts/LoginLayout';
import BasicLayout from './layouts/BasicLayout';
import DetailsPage from './layouts/DetailsPage';
import ReleaseIssue from './layouts/ReleaseIssue';
import ManageLayout from './layouts/ManageLayout';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LoginLayout} />
        <Route path="/main" exact component={BasicLayout} />
        <Route path="/manage" component={ManageLayout} />
        <Route path="/main/article" component={DetailsPage} />
        <Route path="/main/release" component={ReleaseIssue} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
