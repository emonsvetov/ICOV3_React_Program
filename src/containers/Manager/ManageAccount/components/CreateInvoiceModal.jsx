import React from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import CreateInvoiceForm from './CreateInvoiceForm'
import { Modal } from 'reactstrap';

// const AddEventImg = `/img/pages/addEvent.png`;

const CreateInvoiceModal= ({program, isOpen, setOpen, toggle}) => {

  let props = {
    btnLabel: 'Generate Invoice',
    program,
  }

  return (
    <Modal className={`program-settings modal-2col modal-lg`} isOpen={isOpen} toggle={() => setOpen(true)}>
      
        <div className='close cursor-pointer'>
          <CloseIcon onClick={toggle} size={30}/>
        </div>
      
        <div className="left">
          <div className='title mb-5'>
            <h3>Create New Invoice</h3>
            {/*<span>*/}
            {/*  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.*/}
            {/*</span>*/}
          </div>
          {/*<img src={AddEventImg}/>*/}
        </div>

        <div className="right">
          <CreateInvoiceForm {...props} />
        </div>
        

    </Modal>
)}

export default CreateInvoiceModal;
