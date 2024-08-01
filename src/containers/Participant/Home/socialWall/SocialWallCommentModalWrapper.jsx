import React from "react";
import { connect } from "react-redux";
import SocialWallCommentPopup from "./SocialWallCommentPopup";
import { useTranslation } from "react-i18next";

const SocialWallCommentModalWrapper = ({
  isManager,
  user,
  organization,
  program,
  name,
  isOpen,
  setOpen,
  toggle,
  socialWallPost,
  auth,
  setSocialWallPosts,
}) => {
  const { t } = useTranslation();
  const props = {
    isManager,
    isOpen,
    setOpen,
    toggle,
    organization,
    program,
    user,
    socialWallPost,
    auth,
    setSocialWallPosts,
  };
  if (!organization?.id || !program?.id) return t("loading");
  return <>{<SocialWallCommentPopup {...props} />}</>;
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(SocialWallCommentModalWrapper);
