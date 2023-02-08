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
  const [isOpen, setOpen] = useState(false);
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
          <NavbarBrand href="/">
            <img src={Brand} />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse navbar>
            <Nav className="horizontal" navbar>
              {template ? (
                <Button
                  className="btn-blue text-uppercase px-5"
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
