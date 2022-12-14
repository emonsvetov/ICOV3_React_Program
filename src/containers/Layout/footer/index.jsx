import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <footer>
      <Container className="footer__wrapper">
        <Row>
          <div className="col-md-6 copyright">
            {t("copyright")} {new Date().getFullYear()}{" "}
            <span className="text-warning">Incencto</span> LLC.{" "}
            {t("all_rights_reserved")}.
          </div>
          <nav className="col-md-6 teritery-menu">
            <ul className="horizontal">
              <li>
                <Link to="/" className="link">
                  {t("about_us")}
                </Link>
              </li>
              <li>
                <Link to="/" className="link">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link to="/" className="link">
                  {t("terms_and_conditions")}
                </Link>
              </li>
              <li>
                <Link to="/" className="link">
                  {t("faqs")}
                </Link>
              </li>
              <li>
                <Link to="/" className="link">
                  {t("support_request")}
                </Link>
              </li>
            </ul>
          </nav>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
