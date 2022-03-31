import React, {useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated, getAuthUser } from './auth';

export const PublicRoute = () => {
    // console.log('PublicRoute')
    let navigate = useNavigate();
    useEffect( () => {
        if( isAuthenticated() )   {
            const user = getAuthUser()
            // console.log(user)
            let sentTo = '/'
            if( user.loginAs === 'Manager') {
                sentTo = '/manager'
            }   else if( user.loginAs === 'Participant' ) {
                sentTo = '/participant'
            }
            navigate(sentTo)
        }
    }, [])

    return(
        <Outlet />
    )
}

export default PublicRoute;