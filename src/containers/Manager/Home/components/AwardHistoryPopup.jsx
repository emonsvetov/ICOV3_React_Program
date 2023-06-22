import React from 'react';

import {Modal,
   Card,
   CardBody,
   CardHeader
} from 'reactstrap';

import CloseIcon from 'mdi-react/CloseIcon';


import AwardHistoryTable from './AwardHistoryTable';

const AwardHistoryPopup = ({participant, isOpen, setOpen, toggle}) => {

  return (
    <Modal className={`program-settings modal-2col modal-xl`} isOpen={isOpen} toggle={() => setOpen(true)}>
      
          <div className='close cursor-pointer'>
            <CloseIcon onClick={toggle} size={30}/>
          </div>
          <Card className='w-100'>
            <CardHeader tag="h3">Award History</CardHeader>
            <CardBody>
              <AwardHistoryTable participant={participant} />
            </CardBody>
        </Card>
    </Modal>
)}

export default AwardHistoryPopup;
