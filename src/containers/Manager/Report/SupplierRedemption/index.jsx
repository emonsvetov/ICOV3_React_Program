import React from 'react';
import {Link} from 'react-router-dom';
import {Col, Container, Row} from 'reactstrap';
import SupplierRedemptionCard from './components/SupplierRedemptionIndex.jsx';

const SupplierRedemption = () => {
  return (
      <Row>
        <SupplierRedemptionCard/>
      </Row>
  )
}

export default SupplierRedemption;
