import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios'
import Routes from './Routes';
import store from './store';
import '../../scss/app.scss';
import {getBearer, getOrganization, getAuthUser, getAuthProgram} from './auth';
import {setOrganization} from '@/redux/actions/organizationActions';
import {setAuthUser} from '@/redux/actions/userActions';
import {setStoreProgram} from '@/redux/actions/programActions';
import {sendFlashMessage, FlashMessage} from "@/shared/components/flash";

// require('dotenv').config()
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL + '/api/v1';
if( !axios.defaults.headers.common['Authorization'] )
axios.defaults.headers.common['Authorization'] = getBearer();
if( !axios.defaults.headers.post['Content-Type'] )
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    // console.log(request);
    // Edit request config
    return request;
}, error => {
    // console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    // console.log(response);
    // Edit response config
    return response;
}, error => {
    // console.log(error);
    return Promise.reject(error);
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener('load', () => {
      setIsLoading(false);
      setTimeout(() => setIsLoaded(true), 500)
      setAuthOrganization()
    });
  }, []);

  const setAuthOrganization = () => {
    // console.log(getAuthProgram())
    store.dispatch(setOrganization(getOrganization()))
    store.dispatch(setAuthUser(getAuthUser()))
    store.dispatch(setStoreProgram(getAuthProgram()))
  }

  return (
      <Router>
          <Fragment>
            {/* {!isLoaded && (
              <div className={`load${isLoading ? '' : ' loaded'}`}>
                <div className="load__icon-wrap">
                  <svg className="load__icon">
                    <path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                  </svg>
                </div>
              </div>
            )} */}
            <Routes />
            <FlashMessage />
          </Fragment>
      </Router>
  );
}

const AppProvider = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppProvider
