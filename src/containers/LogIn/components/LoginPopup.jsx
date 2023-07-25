import React, {useState} from 'react';

import CloseIcon from 'mdi-react/CloseIcon';
import LogInForm from './LogInForm';

const LoginPopup = ({onCancelHandler}) => {
  // const [value, setValue] = useState(false);
  // const onSubmit = values => {
    
  // }

  return (
    <div className='popup login'>
      <div className='popup__content'>
        <LogInForm />
      </div>
      <div className='popup__top'>
        <CloseIcon onClick={onCancelHandler} size={30}/>
      </div>
    </div>
)}

export default LoginPopup;
