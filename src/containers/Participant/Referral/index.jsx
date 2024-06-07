import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";

import Sidebar from "@/containers/Layout/sidebar";
import ReferralSubmission from "@/containers/Manager/RefParticipants/components/ReferralSubmission";

const SubmitReferral = ({ program }) => {
  // console.log(auth)
  const programId = program?.id;
  return (
    <div className="submit-referral container-fluid">
      <Row className="mt-4">
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={8}>
          <ReferralSubmission programId={programId}/>
        </Col>
        <Col md={1}>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
    program: state.program,
  };
};

export default connect(mapStateToProps)(SubmitReferral);
