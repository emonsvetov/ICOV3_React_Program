import React, { useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { logout, getAuthUserFullname } from "../../App/auth";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TopbarProfile = ({ isManager, auth }) => {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  let navigate = useNavigate();

  const onClickMyAccount = () => {
    let path = isManager ? "manager" : "participant";
    navigate(`/` + path + `/my-account`);
  };
  const Ava = auth.avatar
    ? `${process.env.REACT_APP_API_STORAGE_URL}/` + auth.avatar
    : `${process.env.PUBLIC_URL}/new/img/avatar/avatar.jpg`;

  return (
    <div className="topbar__profile">
      <UncontrolledDropdown inNavbar>
        <DropdownToggle caret nav className="topbar__avatar">
          <img className="topbar__avatar-img" src={Ava} alt="avatar" />
          <div className="d-flex flex-column">
            <span>{t("welcome_back")}</span>
            <strong>{getAuthUserFullname()}</strong>
          </div>
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem onClick={() => onClickMyAccount()}>
            {t("my_account")}
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            onClick={() => {
              logout();
            }}
          >
            {t("sign_out")}
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

      {isCollapsed && (
        <button
          type="button"
          aria-label="button collapse"
          className="topbar__back"
          onClick={handleToggleCollapse}
        />
      )}
      {/* <Collapse isOpen={isCollapsed} className="topbar__menu-wrap">
        <div className="topbar__menu">
          <TopbarMenuLink title="Dashboard" icon="list" path="/" />
          <div className="topbar__menu-divider" />
          <TopbarMenuLink title="Log Out" icon="exit" path="" onClick={()=>{
          if(window.confirm('Are you sure to log out?')) {
            logout()
          }}} />
         </div>
      </Collapse> */}
    </div>
  );
};

export default connect((state) => ({
  auth: state.auth,
}))(TopbarProfile);
