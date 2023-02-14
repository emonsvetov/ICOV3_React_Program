import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CloseIcon from 'mdi-react/CloseIcon';
import {getEventTypes} from '@/services/getEventTypes'
import {labelizeNamedData, patch4Select} from '@/shared/helpers'
import {useDispatch, sendFlashMessage} from "@/shared/components/flash"
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import ReferralForm from './ReferralForm'
import { Modal } from 'reactstrap';

const AddEventImg = `/img/pages/addEvent.png`;

const EditEventModal = ({program, organization, isOpen, setOpen, toggle, data, referral, setReferral}) => {
  const dispatch = useDispatch()
  
  const [loading, setLoading] = useState(false);

  
  // console.log(program)
  const onSubmit = (values) => {

  
    setReferral( referral )
    setLoading(true)
    
  };
  

  let props = {
    // btnLabel: 'Add New Event',
    loading,
    onSubmit,
    referral
  }

  return (
    <Modal className={`program-settings modal-2col modal-lg`} isOpen={isOpen} toggle={() => setOpen(true)}>
      
        <div className='close cursor-pointer'>
          <CloseIcon onClick={toggle} size={30}/>
        </div>
      
        <div className="left">
          <div className='title mb-5'>
            <h3>Edit Referral {referral.email}</h3>
            {/*<span>*/}
            {/*  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.*/}
            {/*</span>*/}
          </div>
          <img src={AddEventImg}/>
        </div>

        <div className="right">
          <ReferralForm {...props} />
        </div>
      
    </Modal>
)}

export default EditEventModal;
