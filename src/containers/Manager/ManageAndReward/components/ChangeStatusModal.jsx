import React, {useState, useEffect} from 'react'
import { Modal, Input, Col, Row, FormGroup, FormFeedback, Label, Button} from 'reactstrap'
import { Form, Field } from 'react-final-form'
import CloseIcon from 'mdi-react/CloseIcon'
import {flashDispatch, flashMessage } from '@/shared/helper'
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import axios from 'axios'
import TemplateButton from "@/shared/components/TemplateButton"

const ChangeStatusModal = ({isOpen, setOpen, toggle, participants, program, organization, name}) => {
  const dispatch = flashDispatch()
  const [saving, setSaving] = useState(false);
  let statusLabel,status = '';
  if(name == "Deactivate") {
    statusLabel = 'Deactivated'; status= 'Deactivated';
  }
  if(name == "Activate") {
    statusLabel = 'Activated'; status= 'Active';
  }

  const onSubmit = values => {
    // console.log(JSON.stringify( values ))
    var formData = {
      users: [],
      'status': status
    }

    participants.map((item, index) => {
      formData.users.push(item.id)
    })
    // console.log(formData)
    // setSaving(true)
    // return

    axios
    .patch(`/organization/${organization.id}/program/${program.id}/participant/status`, formData)
    .then((res) => {
        // console.log(res)
      if (res.status == 200) {
        dispatch(flashMessage(`Participants ${statusLabel.toLowerCase()} successfully!`, 'alert-success', 'top'))
        setSaving(false)
        toggle()
        window.location.reload()
      }
    })
    .catch((err) => {
      //console.log(error.response.data);
      dispatch(flashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
      setSaving(false)
    });

    console.log(formData)
  }

  let initialValues = {
  }

  return (
    <Modal className={`program-settings modal-lg padded`} isOpen={isOpen} toggle={() => setOpen(true)}>
          <div className='close cursor-pointer'>
            <CloseIcon onClick={toggle} size={30}/>
          </div>
          <div className="right">
            <div className='title mb-1'>
              <h3>{name} User</h3>
            </div>
            {saving && 'Processing, please wait...'}
            <Form
              onSubmit={onSubmit}
              initialValues={initialValues}
              validate={validate}
            >
              {({ handleSubmit, form, submitting, pristine, values }) => {
                // console.log(values)
                return (
                <form className="form d-flex flex-column justify-content-evenly p-2" onSubmit={handleSubmit}>
                  <>
                    <Row>
                      <Col md="6">
                        <Label>Participant List to be {statusLabel}</Label>
                      </Col>
                      <Col md="6">
                          {participants.map((item, index) => {
                            return <div key={index}>
                              <strong>{item.name}</strong>
                            </div>
                          })}
                      </Col>
                    </Row>
                    <div className='d-flex justify-content-end'>
                      <TemplateButton disabled={saving} type='submit' text={name} />
                    </div>
                  </>
                </form>
              )}}
            </Form>
          </div>
    </Modal>
)}

const validate = () => {
  let errors = {
  }
  return errors
}

export default ChangeStatusModal;
