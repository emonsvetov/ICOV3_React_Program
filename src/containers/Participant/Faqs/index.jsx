import React from "react";
import YoutubeEmbed from "./components/YoutubeEmbed";
import { Col, Container, Row } from "reactstrap";
import { Queries, QueriesOrigin } from "./components/Queries";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const Faqs = ({ template }) => {
  const { t, i18n } = useTranslation();
  const isOriginTheme = template?.type == "origin";
  const NewFaqs = () => {
    return (
      <>
        <Container fluid className="dashboard">
          <h2 className="my-3">FAQs</h2>
          Congratulations on participating in your Rewards program! Here are
          some FAQ's to help you understand how the program works.
          <h6>Enjoy!</h6>
        </Container>
        <Container>
          <YoutubeEmbed embedId={"zytPldZoXiE"} />
        </Container>
        <Container fluid className="content">
          <Queries />
        </Container>
      </>
    );
  };

  const OriginalFaqs = () => {
    return (
      <>
        <Container fluid className="dashboard">
          <h2 className="my-3">{t("faqs")}</h2>
          Congratulations on participating in your Rewards program! Here are
          some FAQ's to help you understand how the program works.
          <h6>Enjoy!</h6>
        </Container>
        <Container fluid className="content">
          <QueriesOrigin />
        </Container>
      </>
    );
  };

  return (!isOriginTheme && <NewFaqs />) || (isOriginTheme && <OriginalFaqs />);
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(Faqs);
