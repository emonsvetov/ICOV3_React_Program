import React from 'react';
import CloseIcon from 'mdi-react/CloseIcon';

import { Modal } from 'reactstrap';
import TransferMoneyForm from './TransferMoneyForm';
// const AddEventImg = `/img/pages/addEvent.png`;

const TransferMoneyModal= ({program, isOpen, setOpen, toggle}) => {

  let props = {
    btnLabel: 'Transfer',
    program,
    toggle
  }

  return (
    <Modal className={`program-settings modal-2col modal-lg`} isOpen={isOpen} toggle={() => setOpen(true)}>
      
        <div className='close cursor-pointer'>
          <CloseIcon onClick={toggle} size={30}/>
        </div>
      
        <div className="left" style={{width:'30%'}}>
          <div className='title mb-5'>
            <h3>Transfer Money</h3>
          </div>
          {/*<img src={AddEventImg}/>*/}
        </div>

        <div className="right">
          <TransferMoneyForm {...props} />
        </div>
    </Modal>
)}

export default TransferMoneyModal;
