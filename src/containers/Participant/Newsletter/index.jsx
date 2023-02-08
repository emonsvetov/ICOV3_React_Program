import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { PDF } from "../Training/components/PDF";
import { Col, Container, Row } from "reactstrap";
import { Sidebar, SidebarOrigin } from "../../Layout/sidebar";
import { useTranslation } from "react-i18next";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";

const Newsletter = ({ template }) => {
  const img = `${process.env.PUBLIC_URL}/original/img/thumbnail_The-Changing-Face-of-Incentive-Travel.jpg`;
  const link =
    "https://staging-mypathpps.incentco.com/assets/theme/mypathpps/img/newsletter/The%20Changing%20Face%20of%20Incentive%20Travel.pdf";
  const title = "The Changing Face of Incentive Travel";
  const props = { img, link, title };
  const { t } = useTranslation();

  

  const NewsletterOrigin = () => {
    return (
      <Row className="mt-4">
        <Col md={4}>
          <SidebarOrigin />
        </Col>

        <Col md={3}>
          <div className="pdf-link">
            <h2 className="text-uppercase text-center">{t("newsletter")}</h2>
            <PDF props={props}></PDF>
          </div>
        </Col>
      </Row>
    );
  };

  const NewsletterNew = () => {
    return (
      <>
        <Container>
          <ParticipantTabNavs />
        </Container>
        <Container>
          <Row>
            <Col md={9}>
              <div className="dashboard">
                <div className="pdf-link">
                  <h2 className="text-uppercase text-center">
                    {t("newsletter")}
                  </h2>
                  <PDF props={props}></PDF>
                </div>
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

  return (
    (template?.name === "Classic" && <NewsletterNew />) ||
    (template?.name === "Clear" && <NewsletterOrigin />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(Newsletter);
