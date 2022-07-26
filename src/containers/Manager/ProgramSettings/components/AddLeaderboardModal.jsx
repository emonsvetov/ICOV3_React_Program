import React, {useState, useEffect} from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import AddLeaderboardForm from './AddLeaderboardForm'

import { Modal, Card, CardBody, CardHeader } from 'reactstrap';

const AddLeaderboardModal = ({program, organization, isOpen, setOpen, toggle}) => {

  let props = {
    program,
    organization
  }

  return (
    <Modal className={`program-settings modal-2col modal-xl`} isOpen={isOpen} toggle={() => setOpen(true)}>
      <div className='close cursor-pointer'>
        <CloseIcon onClick={toggle} size={30}/>
      </div>
      <Card className='w-100'>
        <CardHeader tag="h3">Add New Leaderboard</CardHeader>
        <CardBody>
          <AddLeaderboardForm {...props} />
        </CardBody>
      </Card>
    </Modal>
)}

export default AddLeaderboardModal;
