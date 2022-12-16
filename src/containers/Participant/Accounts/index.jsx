import React, { useState, useEffect, useContext } from "react";
import { ParticipantTabNavs } from "@/shared/components/tabNavs";
import { Sidebar } from "@/containers/Layout/sidebar";
import AccountForm from "@/shared/components/account/AccountForm";
import { Input, Col, Row, Container } from "reactstrap";
import { getAuthUser } from "@/containers/App/auth";
import { connect } from "react-redux";
import { SidebarOrigin } from "../../Layout/sidebar";
import { useTranslation } from "react-i18next";
import { themeContext } from "@/context/themeContext";

const Account = ({ template }) => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(false);
  const [user, setUser] = useState(null);
  const onSubmit = (values) => {};

  const {
    state: { themeName },
  } = useContext(themeContext);

  useEffect(() => {
    let user = getAuthUser();
    if (user) setUser(user);
  }, []);

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
            <SidebarOrigin />
          </Col>
          <Col md={7} className="">
            <h3 className="pt-1" style={{ fontSize: "16px" }}>
              {" "}
              {t("my_account")}
            </h3>
            <AccountForm user={user} />
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    (themeName === "original" && <AccountOrigin />) ||
    (themeName === "new" && <AccountNew />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};
export default connect(mapStateToProps)(Account);
