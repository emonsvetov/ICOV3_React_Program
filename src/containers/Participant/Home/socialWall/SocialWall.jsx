import React from "react";
import ConfirmModalWrapper from "@/shared/components/modal/confirmModal/ConfirmModalWrapper";
import TemplateButton from "@/shared/components/TemplateButton";
import SocialWallItem from "./SocialWallItem";
import SocialWallCommentModalWrapper from "./SocialWallCommentModalWrapper";
import { useTranslation } from "react-i18next";

const SocialWall = ({isManager, socialWallPosts, template, program, popupToggle, confirmRef, setSocialWallPost, setOpen, socialWallPost, deleteActivity, setSocialWallPosts, isOpen}) => {
  const { t } = useTranslation();
  return (
    <>
      {isManager && (
        <TemplateButton className="add-new-post" text={t("add_new_post")} />
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
    </>
  );
};
export default SocialWall