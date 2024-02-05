import React, { useState } from "react";
import ConfirmModalWrapper from "@/shared/components/modal/confirmModal/ConfirmModalWrapper";
import TemplateButton from "@/shared/components/TemplateButton";
import SocialWallItem from "../SocialWallItem";
import SocialWallCommentModalWrapper from "../SocialWallCommentModalWrapper";
import { useTranslation } from "react-i18next";

const SocialWallClassic = ({isManager, socialWallPosts, template, program, popupToggle, confirmRef, setSocialWallPost, setDeleteActivityId, setOpen, socialWallPost, deleteActivity, setSocialWallPosts, isOpen, onclickAddPost}) => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  return (
    <div className="container socialWall__container-classic">
      {isManager && (
        <TemplateButton className="add-new-post" text={t("add_new_post")} onClick={onclickAddPost} />
      )}
      <div className={`social-wall-panel-${template.name} panel pt-4`} >
        {socialWallPosts.results.map((item, index) => {
          return (
            <div key={`socialWallItem-${index}`}>
              <SocialWallItem
                program={program}
                data={item}
                popupToggle={popupToggle}
                confirmRef={confirmRef}
                setUsers = {setUsers}
                setSocialWallPost={setSocialWallPost}
                isManager={isManager}
                setDeleteActivityId={setDeleteActivityId}
              />
              <hr className="solid" />
            </div>
          );
        })}
      </div>
      <SocialWallCommentModalWrapper
        isOpen={isOpen}
        setOpen={setOpen}
        toggle={popupToggle}
        socialWallPost={socialWallPost}
        users={users}
        setSocialWallPosts={setSocialWallPosts}
      />
      <ConfirmModalWrapper confirmRef={confirmRef} action={deleteActivity} />
    </div>
  );
};
export default SocialWallClassic