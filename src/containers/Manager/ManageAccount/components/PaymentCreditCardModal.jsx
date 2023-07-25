import React from 'react';
import CloseIcon from 'mdi-react/CloseIcon';

import { Modal } from 'reactstrap';
import PaymentCreditCardForm from './PaymentCreditCardForm';

// const AddEventImg = `/img/pages/addEvent.png`;

const PaymentCreditCardModal= ({program, isOpen, setOpen, toggle}) => {

  let props = {
    btnLabel: 'Make Deposit',
    program,
  }

  return (
    <Modal className={`program-settings modal-2col modal-lg`} isOpen={isOpen} toggle={() => setOpen(true)}>
      
        <div className='close cursor-pointer'>
          <CloseIcon onClick={toggle} size={30}/>
        </div>
      
        <div className="left">
          <div className='title mb-5'>
            <h3>Credit Card Payment</h3>
            <span>
            Complete the credit card transaction process by entering the amount of money you wish to add to your account. Your account will be credited for the amount requested as soon as the credit card processor verifies the payment.            </span>
          </div>
          {/*<img src={AddEventImg}/>*/}
        </div>

        <div className="right">
          <PaymentCreditCardForm {...props} />
        </div>
        

    </Modal>
)}

export default PaymentCreditCardModal;
