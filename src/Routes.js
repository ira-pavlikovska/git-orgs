import React from "react";
import {Route, Switch} from "react-router-dom";
import NoMatch from "./containers/NoMatch";
import OrgListContainer from "./containers/OrgListContainer";
import OrgDetailsContainer from "./containers/OrgDetailsContainer";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={OrgListContainer}/>
    <Route exact path='/org/:login' component={OrgDetailsContainer}/>
    <Route component={NoMatch}/>
  </Switch>
);

export default Routes;
