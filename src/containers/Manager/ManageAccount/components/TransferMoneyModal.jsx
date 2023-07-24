import React from 'react';
import CloseIcon from 'mdi-react/CloseIcon';

import { Modal } from 'reactstrap';
import TransferBetweenAndProgram from './TransferMoneyProgramsForm';
// const AddEventImg = `/img/pages/addEvent.png`;

const TransferMoneyModal= ({program, isOpen, setOpen, toggle}) => {

  let props = {
    btnLabel: 'Transfer',
    program,
  }

  return (
    <Modal className={`program-settings modal-2col modal-lg`} isOpen={isOpen} toggle={() => setOpen(true)}>
      
        <div className='close cursor-pointer'>
          <CloseIcon onClick={toggle} size={30}/>
        </div>
      
        <div className="left">
          <div className='title mb-5'>
            <h3>Transfer Money</h3>
            {/*<span>*/}
            {/*  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.*/}
            {/*</span>*/}
          </div>
          {/*<img src={AddEventImg}/>*/}
        </div>

        <div className="right">
          <TransferBetweenAndProgram {...props} />
        </div>
        

    </Modal>
)}

export default TransferMoneyModal;
