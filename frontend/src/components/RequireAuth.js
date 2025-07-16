import React from 'react';
import Alert from './common/Alert';

const RequireAuth = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Alert severity="warning">You must be logged in to view this page.</Alert>;
  }
  return children;
};

export default RequireAuth;
