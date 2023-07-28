import React from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import { Modal } from 'reactstrap';
import MultipleInvoiceForm from './MultipleInvoicesForm';

// const AddEventImg = `/img/pages/addEvent.png`;

const MultipleInvoiceModal= ({program, isOpen, setOpen, toggle}) => {

  let props = {
    btnLabel: 'Create Multipe Invoices',
    program,
    toggle
  }

  return (
    <Modal className={`program-settings modal-2col modal-lg`} isOpen={isOpen} toggle={() => setOpen(true)}>
      
        <div className='close cursor-pointer'>
          <CloseIcon onClick={toggle} size={30}/>
        </div>
      
        <div className="left">
          <div className='title mb-5'>
            <h3>Fund Your Account</h3>
            <p>Please enter the amount you wish to deposit. You will then be presented with an invoice that you can download as a .pdf and print. Once we receive the payment via check or ACH transfer, your account with be updated with the new balance..</p>
          </div>
          {/*<img src={AddEventImg}/>*/}
        </div>

        <div className="right">
          <h5>Create Multiple Invoices</h5>
          <MultipleInvoiceForm {...props} />
        </div>
    </Modal>
)}

export default MultipleInvoiceModal;
