import React from "react";
import { useTranslation } from "react-i18next";
import {connect} from 'react-redux';

import ConfirmModalWrapper from "@/shared/components/modal/confirmModal/ConfirmModalWrapper";
import SocialWallCommentModalWrapper from "../SocialWallCommentModalWrapper";
import TemplateButton from "@/shared/components/TemplateButton";
import SocialWallItem from "../SocialWallItem";

//Default method starts

const SocialWallClear = ({isManager, socialWallPosts, LikeActivityEvent, template, program, popupToggle, confirmRef, setSocialWallPost, setOpen, socialWallPost, deleteActivity, setSocialWallPosts, isOpen, onclickAddPost}) => {
  const { t } = useTranslation();
  return (
    <div className="container socialWall__container-clear">
      {isManager && (
          <TemplateButton className="add-new-post" text={t("add_new_post")} onClick={onclickAddPost} />
      )}
      <div className={`social-wall-panel-${template.name}`} >
        {socialWallPosts.results.map((item, index) => {
          return (
            <div key={`socialWallItem-${index}`}>
              <SocialWallItem
                program={program}
                data={item}
                popupToggle={popupToggle}
                confirmRef={confirmRef}
                LikeActivityEvent = {LikeActivityEvent}
                setSocialWallPost={setSocialWallPost}
                isManager={isManager}
              />
              <div>&nbsp;</div>
            </div>
          );
        })}
      </div>
      <SocialWallCommentModalWrapper
        isOpen={isOpen}
        setOpen={setOpen}
        toggle={popupToggle}
        socialWallPost={socialWallPost}
        setSocialWallPosts={setSocialWallPosts}
      />
      <ConfirmModalWrapper confirmRef={confirmRef} action={deleteActivity} />
    </div>
  );
};
// const mapDispatchToProps = dispatch => ({
//   // setPostType: (type) => dispatch(setSocialWallPostType(type)),
// });
// export default connect(null, mapDispatchToProps)(SocialWallClear);
export default SocialWallClear;