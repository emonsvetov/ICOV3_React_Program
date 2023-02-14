import React, {useEffect, useState} from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import SupplierRedemptionTable from './SupplierRedemptionTable';
import axios from "axios";
import {isEmpty} from '@/shared/helpers'
import {connect} from "react-redux";

const SupplierRedemptionIndex = ({ organization }) => {
  const [merchants, setMerchants] = useState([]);
  const [defaultMerchants, setDefaultMerchants] = useState([]);


  const getData = async () => {
    const merchantsApiUrl = `/organization/${organization.id}/merchant?page=0&limit=9999999999&minimal=1`
    if (isEmpty(merchants)) {
      try {
        const response = await axios.get(merchantsApiUrl);
        if (response.data.length === 0) return {results: [], count: 0}

        const data = response.data;
        setMerchants(data);
        return data;
      } catch (e) {
        // throw new Error(`API error:${e?.message}`);
      }
    }
  }

  useEffect(() => {
    if (organization) {
      getData();
    }
    if (merchants) {
      const result = merchants.map(x => x.id)
      setDefaultMerchants(result);
    }
  }, [merchants, organization])

  if (isEmpty(defaultMerchants)) {
    return <p>Loading...</p>;
  }

  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <SupplierRedemptionTable merchants={defaultMerchants} />
        </CardBody>
      </Card>
    </Col>
  )
}

const mapStateToProps = (state) => {
  return {
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(SupplierRedemptionIndex);