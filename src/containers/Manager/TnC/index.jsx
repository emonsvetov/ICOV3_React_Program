import React from "react";
import YoutubeEmbed from "./components/YoutubeEmbed";
import { Container } from "reactstrap";
import { Queries, QueriesOrigin } from "./components/Queries";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const Faqs = ({ template }) => {
  const { t } = useTranslation();
  

  const NewFaqs = () => {
    return (
      <>
        <Container fluid className="dashboard">
          <h2 className="my-3">{t("faqs")}</h2>
          {t("congratulations_faq")}
          <h6>{t("enjoy")}!</h6>
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
          {t("congratulations_faq")}
          <h6>{t("enjoy")}!</h6>
        </Container>
        <Container fluid className="content">
          <QueriesOrigin />
        </Container>
      </>
    );
  };

  return (
    (template?.name === "classic" && <NewFaqs />) ||
    (template?.name === "clear" && <OriginalFaqs />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(Faqs);
