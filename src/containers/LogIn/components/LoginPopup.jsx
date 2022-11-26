import React, {useState} from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Input, Col, Row, FormGroup, FormFeedback, Label, Button} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import CloseIcon from 'mdi-react/CloseIcon';
import LogInForm from './LogInForm';

const GiveRewardImg = `/img/pages/giveReward.png`;
const Participants = [
  'Bobrowski Robert'
]
const LoginPopup = ({onCancelHandler}) => {
  const [value, setValue] = useState(false);
  const onSubmit = values => {
    
  }

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
