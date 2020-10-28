import React, { FC } from 'react';
import { Switch, Route,  BrowserRouter as Router, Redirect, RouteProps } from 'react-router-dom';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import List from './pages/List';
import { getCookies } from './utils/cookies';

export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={SignIn}/>
                <Route exact path="/login" component={SignIn}/>
                <Route exact path="/register" component={Register}/>
                <PrivateRoute path="/list">
                  <List />
                </PrivateRoute>
            </Switch>
        </Router>
    )
}

const PrivateRoute:FC<RouteProps> = ({path, component, children, ...rest }) => {

    function checkAuth() {
      const cookies = getCookies();
      if(cookies?.token === 'QpwL5tke4Pnpja7X4') {
        return true
      }
      return false
    }

    return (
        <Route
          {...rest}
          render={({ location }) =>
            checkAuth() ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/Login",
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
}