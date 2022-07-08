/**
 *
 * PrivateRoute
 * Higher Order Component that blocks navigation when the user is not logged in
 * and redirect the user to login page
 *
 * Wrap your protected routes to secure your container
 */

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Layout from '../../components/layout/main2';

import auth from '../../utils/auth';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !auth.getToken() ? (
        <Layout>
            <Component {...props} />
        </Layout>
       
      ) : (
        <Redirect
          to={{
            pathname: '/home',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PublicRoute;
