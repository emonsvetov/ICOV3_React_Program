import React from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import Budget from "./view/Budget";
import SelectProgram from "../components/SelectProgram";

const Index = ({ auth, program, organization }) => {
  const { t } = useTranslation();

  if (!auth || !program || !organization) return t("loading");
  
  return (
    <div className="bg-primary">
      <Container>
        <div style={{ padding: "5px 20px" }} className="m-2">
          <Budget />
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
