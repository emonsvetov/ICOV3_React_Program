import React from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import ReferralForm from './ReferralForm'
import { Modal } from 'reactstrap';

const AddEventImg = `/img/pages/addEvent.png`;

const AddReferralModal= ({program, isOpen, setOpen, toggle}) => {

  let props = {
    btnLabel: 'Add New Referral',
    program,
  }

  return (
    <Modal className={`program-settings modal-2col modal-lg`} isOpen={isOpen} toggle={() => setOpen(true)}>
      
        <div className='close cursor-pointer'>
          <CloseIcon onClick={toggle} size={30}/>
        </div>
      
        <div className="left">
          <div className='title mb-5'>
            <h3>Add New Referral Administrator</h3>
            {/*<span>*/}
            {/*  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.*/}
            {/*</span>*/}
          </div>
          {/*<img src={AddEventImg}/>*/}
        </div>

        <div className="right">
          <ReferralForm {...props} />
        </div>
        

    </Modal>
)}

export default AddReferralModal;
