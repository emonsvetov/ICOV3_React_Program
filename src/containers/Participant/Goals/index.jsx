import React, {useState, useEffect} from 'react';
import { ParticipantTabNavs } from '../../../shared/components/tabNavs';
import Sidebar from '../../Layout/sidebar';
import { Table, Col, Row,Container} from 'reactstrap';

const Goals = () => {
    
  const onSubmit = values => {
    
  }
  const GoalTable = () =>{
    return <Table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Date Begin</th>
        <th>Date End</th>
        <th>Target</th>
        <th>Progress</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">My Goal</th>
        <td>01/04/2022</td>
        <td>01/10/2022</td>
        <td>@twitter</td>
        <td>on progress</td>
      </tr>
    </tbody>
  </Table>
  }

  return (
    <>
      <Container>
          <ParticipantTabNavs />
        <Row>
          <Col md={9}>
            <div className="dashboard">
              <GoalTable />
            </div>
          </Col>
          <Col md={3}>
              <Sidebar/>
          </Col>
        </Row>
      </Container>
    </>
)}

export default Goals;
