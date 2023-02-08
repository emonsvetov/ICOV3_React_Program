import React, { useContext } from "react";
import YoutubeEmbed from "./components/YoutubeEmbed";
import { Col, Container, Row } from "reactstrap";
import { Queries, QueriesOrigin } from "./components/Queries";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const Faqs = ({ template }) => {
  const { t } = useTranslation();
  

  const NewFaqs = () => {
    return (
      <>
        <Container fluid className="dashboard" style={{padding: "0px 200px 0px 200px"}}>
          <h2 className="my-3">{t("faqs")}</h2>
          {t("congratulations_faq")}
          <h6>{t("enjoy")}!</h6>
        </Container>
        <Container>
          <YoutubeEmbed embedId={"zytPldZoXiE"} />
        </Container>
        <Container fluid className="content" style={{padding: "0px 200px 50px 200px"}}>
          <Queries />
        </Container>
      </>
    );
  };

  const OriginalFaqs = () => {
    return (
      <>
        <Container fluid className="dashboard" style={{padding: "0px 200px 0px 200px"}}>
          <h2 className="my-3">{t("faqs")}</h2>
          {t("congratulations_faq")}
          <h6>{t("enjoy")}!</h6>
        </Container>
        <Container fluid className="content" style={{padding: "0px 200px 50px 200px"}}>
          <QueriesOrigin />
        </Container>
      </>
    );
  };

  return (
    (template?.name === "Classic" && <NewFaqs />) ||
    (template?.name === "Clear" && <OriginalFaqs />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(Faqs);
