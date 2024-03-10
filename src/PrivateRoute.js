// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the path accordingly

const PrivateRoute = ({ element }) => {
  const { authToken } = useAuth();

console.log(element);
  return authToken ? (
     <div>
        <p>Page content</p>
     </div>
        
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
