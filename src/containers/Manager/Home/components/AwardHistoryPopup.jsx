import React, {useState} from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import {Modal,
   Input, 
   Col, 
   Row, 
   FormGroup, 
   FormFeedback, 
   Label, 
   Button,
   Card,
   CardBody,
   CardHeader
} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import CloseIcon from 'mdi-react/CloseIcon';
import Switch from '@/shared/components/form/Switch';

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
