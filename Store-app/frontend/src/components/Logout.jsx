import React from 'react'
import { Navigate } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { delete_token } from '../redux/userslice';

export default  function Logout() {
    const dispatch=useDispatch();
   window.localStorage.removeItem('user_token');
   dispatch(delete_token());
   
       
    return <Navigate to='/login'/>
}
