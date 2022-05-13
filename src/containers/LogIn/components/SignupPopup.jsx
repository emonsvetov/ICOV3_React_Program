import React, {useState} from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import SignupForm from './SignupForm';

const Signup = ({onCancelHandler}) => {
  const [value, setValue] = useState(false);
  const onSubmit = values => {
    
  }

  return (
    <div className='popup login'>
      <div className='popup__content'>
        <div className="card w-100">  
          <div className="card-body mt-3">
            <SignupForm onSubmit />
          </div>
        </div>

      </div>
      <div className='popup__top'>
        <CloseIcon onClick={onCancelHandler} size={30}/>
      </div>
    </div>
)}

export default Signup;
