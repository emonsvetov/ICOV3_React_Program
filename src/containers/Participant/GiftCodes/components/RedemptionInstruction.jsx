import React, {useRef, useState} from 'react';
import {
  Modal,
  Input,
  Col,
  Row,
  FormGroup,
  FormFeedback,
  Button,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import { createMarkup } from "@/shared/helper";

const storageUrl = `${process.env.REACT_APP_API_STORAGE_URL}/`

const RedemptionInstruction = ({isOpen, setOpen, toggle, merchant, program, organization, auth, setSocialWallPosts}) => {

  return (
    <Modal className={`modal-2col modal-lg redemption_instruction_modal`} isOpen={isOpen} toggle={() => setOpen(true)}>

      <Card className='w-100'>
        <CardHeader tag="h3">
          Redemption Instructions
          <Button className='btn btn-lg float-end' close onClick={toggle}/>
        </CardHeader>
        <CardBody>
          <img width="100" src={storageUrl + merchant.icon} className="gift-icon"></img>
          <div className="right" dangerouslySetInnerHTML={createMarkup(merchant.redemption_instruction)}/>
        </CardBody>
      </Card>


    </Modal>
  )
}

export default RedemptionInstruction;
