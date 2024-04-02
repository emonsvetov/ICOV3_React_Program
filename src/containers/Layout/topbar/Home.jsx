import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  Button,
} from "reactstrap";
import TemplateButton from "@/shared/components/TemplateButton";
import { useTranslation } from "react-i18next";

const LINKS = [
  { to: "onClickLogin", text: "sign_in", desc: "returning_users" },
  { to: "", text: "sign_up", desc: "first_time_users" },
];

const HomeTopbar = ({ onClickLogin, onClickSignup, template }) => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(true);
  const toggle = () => {
    setOpen((prev) => !prev);
  };
  // console.log(template)
  if (!template) return t("loading");
  const Brand = `${process.env.REACT_APP_API_STORAGE_URL}/${template.big_logo}`;
  return (
    <div className="topbar home">
      <div className="topbar__wrapper">
        <Navbar color="" expand="md" fixed="" light>
          <div className="navbar-top_row">
            <div className="navbar-brand-logowrap">
              <NavbarBrand href="/">
                <img src={Brand}  alt="Brand"/>
              </NavbarBrand>
            </div>
            {/* <NavbarToggler onClick={toggle} /> */}
            <div className="topbar__right">
              <Collapse isOpen={isOpen} navbar>
                <Nav className="horizontal" navbar>
                  {template ? (
                    <Button
                      className="btn-blue text-uppercase"
                      onClick={onClickLogin}
                    >
                      {" "}
                      {t("sign_in")}
                    </Button>
                  ) : (
                    LINKS.map((item, index) => {
                      return (
                        <div key={index} className="flex-column mx-3">
                          <span>{t(item.desc)}</span>
                          <TemplateButton
                            className="text-uppercase item width100 lg"
                            onClick={item.to ? onClickLogin : onClickSignup}
                            text={t(item.text)}
                          />
                        </div>
                      );
                    })
                  )}
                </Nav>
              </Collapse>
            </div>
          </div>
        </Navbar>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(HomeTopbar);

// export default HomeTopbar;
