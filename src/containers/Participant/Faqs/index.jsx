import React from "react";
import YoutubeEmbed from "./components/YoutubeEmbed";
import { Col, Container, Row } from "reactstrap";
import Queries from "./components/Queries";

const Faqs = () => {
  return (
    <>
      <Container fluid className="dashboard">
        <h2 className="my-3">FAQs</h2>
        Congratulations on participating in your Rewards program! Here are some
        FAQ's to help you understand how the program works.
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

export default Faqs;
