import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ClientProtectedRoute({ children }) {
  const token = useSelector(state => state.user.token);
  const user = useSelector(state => state.user.user);
  const role = useSelector(state => state.user.role);

  if (!token || !user ) {
    return <Navigate to="/login" />;
  }
  if(token && user && role==='admin'){
    return <Navigate to="/admin" />;


  }
  

  return children;
}
