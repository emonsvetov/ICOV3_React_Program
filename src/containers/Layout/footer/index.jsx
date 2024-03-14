import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {  Container, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

const PARTICIPANT_FOOTER_LINKS = [
  { to: "/participant/about", text: "about_us" },
  { to: "/participant/privacy", text: "privacy" },
  { to: "/participant/tnc", text: "terms_and_conditions" },
  { to: "/participant/faqs", text: "faqs" }
];

const MANAGER_FOOTER_LINKS = [
  { to: "/manager/about", text: "about_us" },
  { to: "/manager/privacy", text: "privacy" },
  { to: "/manager/tnc", text: "terms_and_conditions" },
  { to: "/manager/faqs", text: "faqs" }
];

const Footer = ({links}) => {
  const { t } = useTranslation();
  return (
    <footer>
      <Container className="footer__wrapper">
        <Row>
          <div className="col-md-6 copyright">
            {t("copyright")} {new Date().getFullYear()}{" "}
            <span className="text-warning">Incentco</span> LLC.{" "}
            {t("all_rights_reserved")}.
          </div>
          <nav className="col-md-6 teritery-menu">
            <ul className="horizontal">
              {links.map((item, index) =>
                <li key={index}>
                  <Link to={item.to} className="link">
                    {t(item.text)}
                  </Link>
                </li>
              )}
              <li><a href={"https://incentco.zendesk.com/hc/en-us/requests/new"} className="link">{t("support_request")}</a>
              </li>
            </ul>
          </nav>
        </Row>
      </Container>
    </footer>
  );
};

export const ParticipantFooter = () =>{
  return <Footer links = {PARTICIPANT_FOOTER_LINKS} />
};

export const ManagerFooter = () =>{
  return <Footer links = {MANAGER_FOOTER_LINKS} />
  
};
