import React from 'react';
import LogInForm from './components/LogInForm';
const IncentcoLogo = `${process.env.PUBLIC_URL}/img/logo/logo_light.svg`;

const LogIn = () => (
  <div>
    <img src={IncentcoLogo} className="img__logo_sm" alt="logo" />
    <div className="flex-column align-items-center pt-4"  style={{maxWidth:500,margin:'0 auto'}}>
        <div className="card">
          <div className="card-header">Log in to continue</div>
          <div className="card-body">
            <LogInForm onSubmit />
          </div>
        </div>
    </div>
  </div>
);

export default LogIn;

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
