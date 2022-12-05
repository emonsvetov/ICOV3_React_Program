import React, { useState, useEffect } from "react";
import { ParticipantTabNavs } from "@/shared/components/tabNavs";
import { Sidebar } from "@/containers/Layout/sidebar";
import AccountForm from "@/shared/components/account/AccountForm";
import { Input, Col, Row, Container } from "reactstrap";
import { getAuthUser } from "@/containers/App/auth";
import { connect } from "react-redux";
import { SidebarOrigin } from "../../Layout/sidebar";

const Account = ({ template }) => {
  const [value, setValue] = useState(false);
  const [user, setUser] = useState(null);
  const onSubmit = (values) => {};
  useEffect(() => {
    let user = getAuthUser();
    if (user) setUser(user);
  }, []);
  const isOriginTheme = template?.type == "origin";

  const AccountNew = () => {
    return (
      <>
        <Container>
          <ParticipantTabNavs />
          <Row>
            <Col md={9}>
              <h2 className="text-center title mb-5">My Account</h2>
              <div className="dashboard">
                <AccountForm user={user} />
              </div>
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  const AccountOrigin = () => {
    return (
      <Container fluid>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={4}>
            <SidebarOrigin props={{ title: "My Rewards", icon: "MyRewards" }} />
          </Col>
          <Col md={7} className="">
            <h3 className="pt-1" style={{ fontSize: "16px" }}>
              {" "}
              My Account
            </h3>
            <AccountForm user={user} />
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    (isOriginTheme && <AccountOrigin />) || (!isOriginTheme && <AccountNew />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};
export default connect(mapStateToProps)(Account);
