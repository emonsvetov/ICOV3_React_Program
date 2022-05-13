import React, {useState} from 'react';
import {Modal,
   Card,
   CardBody,
   CardHeader,
   CardFooter,
   ButtonGroup,
   Button
} from 'reactstrap';
import CloseIcon from 'mdi-react/CloseIcon';

const AddPostPopup = ({isOpen, setOpen, toggle}) => {

  return (
    <Modal className={`program-settings modal-2col modal-md`} isOpen={isOpen} toggle={() => setOpen(true)}>
      
          <div className='close cursor-pointer'>
            <CloseIcon onClick={toggle} size={30}/>
          </div>
          <Card className='w-100'>
            <CardHeader tag="h3">Post Message!</CardHeader>
            <Card>
              <CardHeader tag="h3"></CardHeader>
              <CardBody className='' contenteditable="true">
              
              </CardBody>
            </Card>
            
            <CardFooter>
              <ButtonGroup>
                <Button>Proceed</Button>
                
              </ButtonGroup>
            </CardFooter>
        </Card>
    </Modal>
)}

export default AddPostPopup;
