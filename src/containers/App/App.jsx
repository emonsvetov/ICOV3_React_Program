import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import '../../scss/app.scss';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener('load', () => {
      setIsLoading(false);
      setTimeout(() => setIsLoaded(true), 500)
    });
  }, []);
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
            
          </Fragment>
      </Router>
  );
}

export default App;
