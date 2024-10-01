import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
export default function Admin_protected_route({children}) {
    const token = useSelector(state => state.user.token);
    const user = useSelector(state => state.user.user);
    const role = useSelector(state => state.user.role);
   

    if(!user || !token){
        return <Navigate to="/login"/>

    }
    if(user && token &&role==="client"){
        return <Navigate to="/client"/>
    }
    return children;

}
