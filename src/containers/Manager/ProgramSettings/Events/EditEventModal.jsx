import React, {useState, useEffect} from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import EventForm from './components/EventForm'
import { Modal } from 'reactstrap';
import {Img} from '@/theme'


const EditEventModal = ({program, isOpen, setOpen, toggle, event, setTrigger}) => {

  let props = {
    toggle,
    data: event,
    program,
    setTrigger
  }

  return (
    <Modal className={`program-settings modal-2col modal-xl`} isOpen={isOpen} toggle={() => setOpen(true)}>
      
        <div className='close cursor-pointer'>
          <CloseIcon onClick={toggle} size={30}/>
        </div>
      
        <div className="left">
          <div className='title'>
            <h3>Edit Event</h3>
            <span>
              Edit event details here
            </span>
          </div>
          <Img src="img/pages/addEvent.png" className="edit-event" />
        </div>

        <div className="right">
          <EventForm {...props} />
        </div>
      
    </Modal>
)}

export default EditEventModal;
