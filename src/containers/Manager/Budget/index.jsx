import React, { useState } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import { useTranslation } from "react-i18next";

const Index = ({ auth, program, organization }) => {
  const { t } = useTranslation();

  if (!auth || !program || !organization) return t("loading");

  return (
    <div className="bg-primary">
      <Container>
        <div style={{ padding: "5px 20px" }} className="m-2">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(Index);
