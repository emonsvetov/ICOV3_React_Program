import React, { useEffect, useRef, useState } from "react";
import { getSocialWallPosts } from "@/services/program/getSocialWallPosts";
import { connect } from "react-redux";
import { deleteSocialWallPost } from "@/redux/actions/socialWallPostActions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {Themed} from '@/theme'
// import {SocialWall} from './themed'

const SocialWallPanel = ({ organization, program, isManager, template }) => {
  const { t } = useTranslation();
  let [socialWallPosts, setSocialWallPosts] = useState(null);
  let [socialWallPost, setSocialWallPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const confirmRef = useRef({});
  const dispatch = useDispatch();

  const popupToggle = () => {
    setOpen((prevState) => !prevState);
  };
  const [isOpen, setOpen] = useState(false);
  const [deleteActivityId, setDeleteActivityId] = useState(false);

  const deleteActivity = () => {
    dispatch(
      deleteSocialWallPost(organization.id, program.id, deleteActivityId)
    )
      .then((res) => {
        getSocialWallPosts(organization.id, program.id, 0, 999999)
          .then((data) => {
            setSocialWallPosts(data);
            confirmRef.current.toggle();
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
      getSocialWallPosts(organization.id, program.id, 0, 999999)
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

  const props = {isManager, socialWallPosts, template, program, popupToggle, confirmRef, setSocialWallPost, setDeleteActivityId, setOpen, socialWallPost, deleteActivity, setSocialWallPosts, isOpen}

  return <Themed component="SocialWall" {...props}  />
};

const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
    template: state.template,
  };
};
export default connect(mapStateToProps)(SocialWallPanel);
