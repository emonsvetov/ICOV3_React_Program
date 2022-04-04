import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

export const PrivateRoute = () => {
    console.log("PrivateRoute")
    let navigate = useNavigate();
    if( !isAuthenticated() )   {
        navigate('/login')
    }
    return(
        <Outlet />
    )
}

export default PrivateRoute;