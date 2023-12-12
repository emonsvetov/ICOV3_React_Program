import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

export const PrivateRoute = () => {
    const navigate = useNavigate();
    React.useEffect( () => {
      if( !isAuthenticated() )   {
          navigate('/login')
      }
    }, [])

    if( !isAuthenticated() ) return '' 

    return(
        <Outlet />
    )
}

export default PrivateRoute;