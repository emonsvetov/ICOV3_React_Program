import React, { useState, useEffect } from "react";
import ResendIcon from "mdi-react/AccountPlusIcon";
import ParticipantGoalPlans from "./ParticipantGoalPlans";
import Select from "react-select";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {
  Modal,
  Input,
  Col,
  Row,
  FormGroup,
  FormFeedback,
  Label,
  Button,
  Container,
  Card, CardBody
} from "reactstrap";
import CloseIcon from "mdi-react/CloseIcon";

import {Img} from '@/theme'

const ParticipantViewModal = ({
  isOpen,
  setOpen,
  toggle,
  participants,
  program,
  organization,
  auth,
  template,
  theme
}) => {
  console.log(participants)
 console.log('kkkk');
  let data = participants
  //console.log(participants)
 const fullName = `${data.first_name} ${data.last_name}`
  return (
    <Modal 
      className={`program-settings modal-2col modal-xl`}
      isOpen={isOpen}
      toggle={() => setOpen(true)}
    >
      <div className="close cursor-pointer">
        <CloseIcon onClick={toggle} size={30} />
      </div>
      <div>
        <div className="title mb-12">
          <h3>Participant Information</h3>
          <span>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna.
          </span>
        </div>
        <div className=" participant-header ">
            <button
            type="button"
            aria-label="button collapse"
            className="template-button border-0 btn btn-secondary"
            // onClick={handleToggleCollapse}
            >Email</button>
            <button
            type="button"
            aria-label="button collapse"
            className="template-button border-0 btn btn-secondary"
            // onClick={handleToggleCollapse}
            >Resend Invite</button>
            <button
            type="button"
            aria-label="button collapse"
            className="template-button border-0 btn btn-secondary"
            // onClick={handleToggleCollapse}
            >Reclaim Peer Allocations</button>
        </div>
    <div>
    <div className="left">
     
                <Row>
                    <Col md={12}>
                        
                                <Row>
                                    <Col md="6" lg="6" xl="6">
                                        <p>{fullName}</p>
                                        <span>{data.email}</span>
                                    </Col>
                                    <Col md="6" lg="6" xl="6" className="text-right">
                                        <Link className="" to={`/users/edit/${data.id}`}>Edit Participant</Link>
                                    </Col>
                                    
                                </Row>
                                <Row>
                                    <Col md="2" lg="2" xl="2" sm="2" className='label'>
                                    Participant Since:
                                    </Col>
                                    <Col md="10" lg="10" xl="10" sm="10">
                                    09/13/2019
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" lg="2" xl="2" sm="2" className='label'>
                                    Last Activity:
                                    </Col>
                                    <Col md="10" lg="10" xl="10" sm="10">
                                        
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" lg="2" xl="2" sm="2" className='label'>
                                    Current Status:
                                    </Col>
                                    <Col md="10" lg="10" xl="10" sm="10">
                                        {data.status.status}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" lg="2" xl="2" sm="2" className='label'>
                                    External ID:
                                    </Col>
                                    <Col md="10" lg="10" xl="10" sm="10">
                                        
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" lg="2" xl="2" sm="2" className='label'>
                                    Anniversary:
                                    </Col>
                                    <Col md="10" lg="10" xl="10" sm="10">
                                    {data.work_anniversary} 
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" lg="2" xl="2" sm="2" className='label'>
                                    Birthday:
                                    </Col>
                                    <Col md="10" lg="10" xl="10" sm="10">
                                    {data.dob}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" lg="2" xl="2" sm="2" className='label'>
                                        Work Anniversary:
                                    </Col>
                                    <Col md="10" lg="10" xl="10" sm="10">
                                        {data.work_anniversary}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" lg="2" xl="2" sm="2" className='label'>
                                        Department / Team:
                                    </Col>
                                    <Col md="10" lg="10" xl="10" sm="10">
                                        {data.division}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2" lg="2" xl="2" sm="2" className='label'>
                                        Birthday:
                                    </Col>
                                    <Col md="10" lg="10" xl="10" sm="10">
                                        {data.dob}
                                    </Col>
                                </Row>
                                
                          
                    </Col>
                </Row>
        
            </div>
            <div className="right">kkk</div>
            </div>
            <h4>Goal Plans</h4>
            <ParticipantGoalPlans></ParticipantGoalPlans>
            </div>
            
    </Modal>
  );
};
export default ParticipantViewModal;