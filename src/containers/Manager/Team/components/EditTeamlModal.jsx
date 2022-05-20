import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CloseIcon from 'mdi-react/CloseIcon';
import {getEventTypes} from '@/services/getEventTypes'
import {labelizeNamedData, patch4Select} from '@/shared/helper'
import {useDispatch, sendFlashMessage} from "@/shared/components/flash"
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import TeamForm from './TeamForm'
import { Modal } from 'reactstrap';

const AddEventImg = `/img/pages/addEvent.png`;

const EditTeamModal = ({program, organization, isOpen, setOpen, toggle, data, mate, setMate}) => {
  const dispatch = useDispatch()
  
  const [loading, setLoading] = useState(false);

  
  // console.log(program)
  const onSubmit = (values) => {

  
    setMate( mate )
    setLoading(true)
    
  };
  

  let props = {
    // btnLabel: 'Add New Event',
    loading,
    onSubmit,
    mate
  }

  return (
    <Modal className={`program-settings modal-2col modal-xl`} isOpen={isOpen} toggle={() => setOpen(true)}>
      
        <div className='close cursor-pointer'>
          <CloseIcon onClick={toggle} size={30}/>
        </div>
      
        <div className="left">
          <div className='title mb-5'>
            <h3>Edit Teammate "{mate.name}"</h3>
            <span>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
            </span>
          </div>
          <img src={AddEventImg}/>
        </div>

        <div className="right">
          <TeamForm {...props} />
        </div>
      
    </Modal>
)}

export default EditTeamModal;
