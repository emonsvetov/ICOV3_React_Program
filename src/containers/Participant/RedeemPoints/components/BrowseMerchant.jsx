import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getMerchants } from "@/services/program/getMerchants";
const BrowseMerchant = ({ organization, program }) => {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    if (organization && program) {
      getMerchants(organization.id, program.id).then((payload) => {
        const sortedMerchants = [...payload].sort((a, b) => a.name.localeCompare(b.name));
        setMerchants(sortedMerchants);
      });
    }
  }, [organization, program]);

  let navigate = useNavigate();
  const LOGO_PUBLIC_URL = `${process.env.REACT_APP_API_STORAGE_URL}`;
  return (
    <div className="browse-merchants">
      <h5>Our Merchants</h5>
      <Row className="merchants-thumbnail">
        {merchants.map((item, index) => {
          return (
            <Col
              md={2}
              className="item"
              key={index}
              onClick={() => navigate(`/participant/redeem/${item.id}`)}
            >
              <img src={`${LOGO_PUBLIC_URL}/${item.logo}`} alt="logo" />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    organization: state.organization,
    program: state.program,
  };
};

export default connect(mapStateToProps)(BrowseMerchant);
