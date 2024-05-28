import React from 'react';
import {connect} from "react-redux";
import TimeAgo from 'react-timeago'
import { useDispatch } from "react-redux";
//CustomModules

import {Themed} from '@/theme'

const SocialWallItem = (props) => {
  // console.log(props)
  const {id, title, content, from, created_at, comments, like_count,  avatar, icon} = props.data;
  const {template, auth} = props;
  const isManager = props.isManager;
  const like = props.data.like ? props.data.like : '[]';

  const confirmRef = props.confirmRef;
  const LikeActivityEvent = props.LikeActivityEvent;

  const defaultAvatar = `${process.env.PUBLIC_URL}/theme/classic/img/avatar/avatar.jpg`
  const storageUrl = `${process.env.REACT_APP_API_STORAGE_URL}/`

  const commentEvent = () => {
    props.setSocialWallPost(props.data)
    props.popupToggle()
  }
  const createMarkup = (value) => {
    return {__html: value};
  }

  const DeleteActivityEvent = (confirmRef, id) => {
    // console.log(id)
    // console.log(confirmRef)
    confirmRef.current.toggle(id)
  }


  const TimeZone = (UTCdate) => {
    let date = new Date(UTCdate)
    let timezoneDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    let offset = date.getTimezoneOffset() / 60;
    let hours = date.getHours();
    return timezoneDate.setHours(hours - offset);
  }

  const postAvatar = avatar ? storageUrl + avatar : defaultAvatar;

  const comProps = {
    program: props.program, postAvatar, title, content, TimeAgo, auth, TimeZone, from, created_at,LikeActivityEvent, commentEvent, comments,like, like_count, DeleteActivityEvent, createMarkup, isManager, confirmRef, id, storageUrl, defaultAvatar, template, icon
  }

  return <Themed component="SocialWallItem" {...comProps}  />

}

const mapStateToProps = (state) => {
  return {
    template: state.template,
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(SocialWallItem);