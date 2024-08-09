import React from "react";
import { connect } from "react-redux";
import AddBudgetSetup from "./AddBudgetSetup";
import BudgetSetupInfoModal from "../view/BudgetSetupInfo";

const MainModalWrapper = (props) => {

  return (
    <>
      {props.name === "AddBudgetSetup" && <AddBudgetSetup {...props} />}
      {props.name === "BudgetSetupInformation" && (
        <BudgetSetupInfoModal {...props} id={props.id} />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(MainModalWrapper);
