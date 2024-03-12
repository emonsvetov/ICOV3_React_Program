import React, {useState, useEffect} from "react";
import { Col, Container, Row } from "reactstrap";

import { ManagerTabNavs } from "../../../shared/components/tabNavs";
import SelectProgram from "../components/SelectProgram";

import Dashboard from "./View/Dashboard";
import Leaderboard from "./View/Leaderboards";

import SocialWallPanel from "@/containers/Participant/Home/socialWall/SocialWallPanel";
import { getAuthProgram } from "@/containers/App/auth";
import { getBalance } from "@/services/program/getBalance";
import {connect} from "react-redux";

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
        <Row>
          <Col md={3} className="program-select d-flex">
            <SelectProgram showRefresh={false}  />
          </Col>
          <Col md={6}>
            <ManagerTabNavs />
          </Col>
        </Row>
        <div align="right">Current Balance: ${balance}</div>
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
            <Row>
              <Col md={3} className="program-select d-flex">
                <SelectProgram />
              </Col>
              <Col md={6}>
                <ManagerTabNavs />
              </Col>
            </Row>
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
        <Row>
          <Col md={3} className="program-select d-flex">
            <SelectProgram />
          </Col>
          <Col md={6}>
            <ManagerTabNavs />
          </Col>
        </Row>
      </Container>
      <Leaderboard />
    </>
  );
};
