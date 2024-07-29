import React, { useEffect, useRef, useState } from "react";
import { getSocialWallPosts } from "@/services/program/getSocialWallPosts";
import { connect } from "react-redux";
import { deleteSocialWallPost, setSocialWallPostType } from "@/redux/actions/socialWallPostActions";
import { useDispatch } from "react-redux";
import { likeSocialWallPost } from "@/redux/actions/socialWallPostActions";
import { useTranslation } from "react-i18next";
import {Themed} from '@/theme'
import {
  useDispatch as useFlashDispatch,
  flashError,
  flashSuccess,
} from "@/shared/components/flash";
// import {SocialWall} from './themed'

const SocialWallPanel = ({ organization, program, isManager, template, setPostType }) => {
  const { t } = useTranslation();
  let [socialWallPosts, setSocialWallPosts] = useState(null);
  let [socialWallPost, setSocialWallPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const confirmRef = useRef({});
  const dispatch = useDispatch();
  const flashDispatch = useFlashDispatch();
  const socialWallPostFilter = {isManager: isManager};

  const popupToggle = () => {
    setOpen((prevState) => !prevState);
  };
  const [isOpen, setOpen] = useState(false);

  const onclickAddPost = () => {
    setPostType('message')
    setOpen(true)
  }

  const deleteActivity = (id) => {
    dispatch(
      deleteSocialWallPost(organization.id, program.id, id)
    )
      .then((res) => {
        getSocialWallPosts(organization.id, program.id, 0, 999999, socialWallPostFilter)
          .then((data) => {
            setSocialWallPosts(data);
            confirmRef.current.toggle();
            flashSuccess(
              flashDispatch,
              "Deleted successfully."
            );
          })
          .catch((error) => {
            console.log(error.response.data);
            flashError(flashDispatch, error.response.data);
          });
      })
      .catch((err) => {
        console.log(err);
        flashError(flashDispatch, err);
      });
  };

  const LikeActivityEvent = (id) => {
    dispatch(
      likeSocialWallPost(organization.id, program.id, {id:id})
    )
      .then((res) => {
        getSocialWallPosts(organization.id, program.id, 0, 999999, socialWallPostFilter)
          .then((data) => {
            setSocialWallPosts(data);
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (organization && program) {
      setLoading(true);
      getSocialWallPosts(organization.id, program.id, 0, 999999, socialWallPostFilter)
        .then((data) => {
          // console.log(data)
          setSocialWallPosts(data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [organization, program]);

  if (!socialWallPosts) return t("loading");

  const props = {isManager, socialWallPosts, template, program, popupToggle, confirmRef, setSocialWallPost,LikeActivityEvent, setOpen, socialWallPost, deleteActivity, setSocialWallPosts, isOpen, onclickAddPost}

  return <Themed component="SocialWall" {...props}  />
};

const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
    template: state.template,
  };
};
const mapDispatchToProps = dispatch => ({
  setPostType: (type) => dispatch(setSocialWallPostType(type)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SocialWallPanel);
