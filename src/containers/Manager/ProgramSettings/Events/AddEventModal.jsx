import React from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import EventForm from './components/EventForm'
import { Modal } from 'reactstrap';
import {Img} from '@/theme'

const AddEventPopup = ({program, isOpen, setOpen, toggle, setTrigger}) => {

  let props = {
    program,
    toggle,
    setTrigger,
  }

  return (
    <Modal className={`program-settings modal-2col modal-xl`} isOpen={isOpen} toggle={() => setOpen(true)}>
        <div className='close cursor-pointer'>
          <CloseIcon onClick={toggle} size={30}/>
        </div>
      
        <div className="left">
          <div className='title'>
            <h3>Add New Event</h3>
            <span>
              Add new event here.
            </span>
          </div>
          <Img src="img/pages/addEvent.png" className="add-event" alt="Event-img" />
        </div>

        <div className="right">
          <EventForm {...props} />
        </div>
    </Modal>
)}

export default AddEventPopup;
