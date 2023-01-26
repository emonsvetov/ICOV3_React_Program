import React, { useState, useEffect } from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import { Modal } from 'reactstrap';

import TeamForm from './TeamForm'

const AddEventImg = `/img/pages/addEvent.png`;

const EditTeamModal = ({ program, isOpen, setOpen, toggle, team }) => {
  /* const dispatch = useDispatch()
   
   const [loading, setLoading] = useState(false);
 
   
   // console.log(program)
   const onSubmit = (values) => {
 
   
     setMate( mate )
     setLoading(true)
     
   };*/

  console.log(team);
  let props = {
    // btnLabel: 'Add New Event',
    toggle,
    data: team,
    program,
  }
  return (
    <Modal className={`program-settings modal-2col modal-xl`} isOpen={isOpen} toggle={() => setOpen(true)}>

      <div className='close cursor-pointer'>
        <CloseIcon onClick={toggle} size={30} />
      </div>

      <div className="left">
        <div className='title mb-5'>
          <h3>Edit Teammate </h3>
          <span>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
          </span>
        </div>
        <img src={AddEventImg} />
      </div>

      <div className="right">
        <TeamForm {...props} />
      </div>

    </Modal>
  )
}

export default EditTeamModal;
