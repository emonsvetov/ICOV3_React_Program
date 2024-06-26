import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";

import ManagerTabSection from "../components/ManagerTabSection";
import { useTranslation } from "react-i18next";
import Dashboard from "./View/Dashboard";
import Leaderboard from "./View/Leaderboards";
import CartIcon from "mdi-react/CartIcon";
import SocialWallPanel from "@/containers/Participant/Home/socialWall/SocialWallPanel";
import { getAuthProgram } from "@/containers/App/auth";
import { getBalance } from "@/services/program/getBalance";
import { connect } from "react-redux";
import BudgetCascadingPendingApprovals from "./components/BudgetCascadingPendingApprovals";

const Home = ({ program, organization }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (organization && program) {
      getBalance(organization.id, program.id)
        .then((data) => {
          setBalance(data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [organization, program]);

  return (
    <>
      <Container>
        <ManagerTabSection />
        <div align="right">Current Balance: ${balance.toFixed(2)}</div>
      </Container>
      <hr></hr>
      <Dashboard />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(Home);

export const NSpireWall = () => {
  const program = getAuthProgram();

  return (
    <>
      {program.uses_social_wall > 0 && (
        <>
          <Container>
            <ManagerTabSection />
          </Container>
          <hr></hr>
          <SocialWallPanel isManager={true} />
        </>
      )}
    </>
  );
};

export const Leaderboards = () => {
  return (
    <>
      <Container>
        <ManagerTabSection />
      </Container>
      <Leaderboard />
    </>
  );
};

export const PendingCascadingApproval = () => {
  const program = getAuthProgram();

  return (
    <>
      {program.use_cascading_approvals > 0 && (
        <>
          <Container>
            <ManagerTabSection />
          </Container>
          <br />
          <div className="m-2 p-2">
            <BudgetCascadingPendingApprovals />
          </div>
        </>
      )}
    </>
  );
};
