import React, {useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated, getAuthUser } from './auth';
import Footer from '../Layout/footer';

export const PublicRoute = () => {
    // console.log('PublicRoute')
    let navigate = useNavigate();
    useEffect( () => {
        if( isAuthenticated() )   {
            const user = getAuthUser()
            // console.log(user)
            let sentTo = '/'
            if( user.loginAs === 'Program Manager') {
                sentTo = '/manager/home'
            }   else if( user.loginAs === 'Participant' ) {
                sentTo = '/participant/home'
            }
            navigate(sentTo)
        }
        else{
            navigate('/login')
        }
    }, [])

    return(
        <main className='home'>
            <Outlet />
            <Footer />    
        </main>
    )
}

export default PublicRoute;

  