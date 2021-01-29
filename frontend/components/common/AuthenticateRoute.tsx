import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const AuthenticatedRoute: React.FC<any> = ({ children, ...props }) => {
  const isAuthenticated = useSelector((state: any) => state.currentUser.isAuthenticated);

  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/pages/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
