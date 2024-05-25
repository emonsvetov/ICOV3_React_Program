import React, { useState } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import SelectProgram from "../components/SelectProgram";

const Index = ({ auth, program, organization }) => {
  const { t } = useTranslation();

  if (!auth || !program || !organization) return t("loading");
  if (program?.use_budget_cascading == 0) {
    return (
      <div className="m-4 p-3">
        <div className="d-flex program-select my-3 p-2 rounded">
          <SelectProgram showRefresh={false} />
        </div>
        <p>{t("Program does not used Budget. Please change the Program.")}</p>
      </div>
    );
  }
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
