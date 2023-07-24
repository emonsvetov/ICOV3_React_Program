import React from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import { Modal } from 'reactstrap';

import ReferralForm from './CreateInvoiceForm'

//const AddEventImg = `/img/pages/addEvent.png`;

const EditReferralModal = ({ program, isOpen, setOpen, toggle, referral }) => {
  let props = {
    toggle,
    referral,
    program,
  }

  return (
    <Modal className={`program-settings modal-2col modal-lg`} isOpen={isOpen} toggle={() => setOpen(true)}>

      <div className='close cursor-pointer'>
        <CloseIcon onClick={toggle} size={30} />
      </div>

      <div className="left">
        <div className='title mb-5'>
          <h3>Edit Referral</h3>
          <strong>{referral?.referral_notification_recipient_email}</strong>
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
  )
}

export default EditReferralModal;
