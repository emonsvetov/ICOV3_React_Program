import React, { useState } from "react";
import ConfirmModalWrapper from "@/shared/components/modal/confirmModal/ConfirmModalWrapper";
import TemplateButton from "@/shared/components/TemplateButton";
import SocialWallItem from "./SocialWallItem";
import SocialWallCommentModalWrapper from "./SocialWallCommentModalWrapper";
import { useTranslation } from "react-i18next";

const SocialWall = ({isManager, socialWallPosts, template, program, popupToggle, confirmRef, setSocialWallPost, setDeleteActivityId, setOpen, socialWallPost, deleteActivity, setSocialWallPosts, isOpen}) => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
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
                setUsers={setUsers}
                setSocialWallPost={setSocialWallPost}
                isManager={isManager}
                setDeleteActivityId={setDeleteActivityId}
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
        users={users}
        socialWallPost={socialWallPost}
        setSocialWallPosts={setSocialWallPosts}
      />
      <ConfirmModalWrapper confirmRef={confirmRef} action={deleteActivity} />
    </>
  );
};
export default SocialWall