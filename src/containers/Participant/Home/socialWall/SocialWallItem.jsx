import React, {useState, useRef} from 'react';
import PlusCircleIcon from 'mdi-react/PlusCircleIcon';
import SocialWallIcon from './SocialWallIcon';
import {Button} from "reactstrap";
import TemplateButton from "@/shared/components/TemplateButton"
import SocialWallCommentModalWrapper from "./SocialWallCommentModalWrapper";
import {connect} from "react-redux";
import TimeAgo from 'react-timeago'
import SocialWallItemClassic from "./themed/SocialWallItemClassic";
import SocialWallItemClear from "./themed/SocialWallItemClear";
import {Themed} from '@/theme'

const SocialWallItem = (props) => {
  const {id, title, content, from, created_at, comments, avatar} = props.data;
  const {template} = props;
  const isManager = props.isManager;
  const confirmRef = props.confirmRef;
  const setDeleteActivityId = props.setDeleteActivityId;
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
    setDeleteActivityId(id)
    confirmRef.current.toggle()
  }

  const TimeZone = (UTCdate) => {
    let date = new Date(UTCdate)
    let timezoneDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    let offset = date.getTimezoneOffset() / 60;
    let hours = date.getHours();

    return timezoneDate.setHours(hours - offset);
  }

  const postAvatar = avatar ? storageUrl + avatar : defaultAvatar;

  const SocialWallOrigin = () => {
    return (
      <table className="social-wall-post" cellPadding="0" cellSpacing="0" width="100%">
        <tbody>
        <tr>
          <td className="social-wall-post-tl"></td>
          <td className="social-wall-post-t"></td>
          <td className="social-wall-post-tr"></td>
        </tr>
        <tr>
          <td className="social-wall-post-l"></td>
          <td className="social-wall-post-body">
            <div className="social-wall-item-header">
              <table>
                <tbody>
                <tr>
                  <td>
                    <img className="circular--portrait" src={ postAvatar } alt="avatar" />
                  </td>
                  <td valign="center">
                    {title}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="social-wall-item-notification-body">
              <table width="100%">
                <tbody>
                <tr>
                  <td width="100%" align="left">
                    {content}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="social-wall-item-from">
              {from}<span>&nbsp;</span>
              <span className="social-wall-time"><TimeAgo date={TimeZone(created_at)}/></span>
              {props.program.uses_social_wall &&
                  <div className='flex-column'>
                    <TemplateButton text='Comment' className='comment-btn' onClick={commentEvent} />
                    {
                        isManager &&
                        <TemplateButton color='danger' className='delete-activity-btn'
                                        onClick={() => DeleteActivityEvent(confirmRef, id)} text='Delete&nbsp;Activity' />
                    }
                  </div>
              }
            </div>
            <div className="social-wall-comments-container ">
              {comments.map((item, index) => {
                const commentAvatar = item.avatar ? storageUrl + item.avatar : defaultAvatar;
                return <div className="social-wall-comment" key={`commentItem-${index}`}>
                  <table width="100%">
                    <tbody>
                    <tr>
                      <td><img className="circular--portrait_comment" src={commentAvatar} alt="avatar" /></td>
                      <td valign="top" width="100%">
                        <span className="social-wall-item-from">{item.fromUser}</span>
                        {
                          isManager &&
                          <span className='deleteComment' onClick={() => DeleteActivityEvent(confirmRef, item.id)}>Delete</span>
                        }
                        <div className="right" dangerouslySetInnerHTML={createMarkup(item.comment)}/>
                        <span className="social-wall-time"><TimeAgo date={TimeZone(item.created_at_formated)} /></span>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              })}
            </div>

            <div className="social-wall-post-comment-container">
              <div className="clear"></div>
            </div>
          </td>
          <td className="social-wall-post-r">
            <div className="social-wall-post-tail"></div>
          </td>
        </tr>
        <tr>
          <td className="social-wall-post-bl"></td>
          <td className="social-wall-post-b"></td>
          <td className="social-wall-post-br"></td>
        </tr>
        </tbody>
      </table>
    );
  };
  const SocialWallNew = () => {
    return (
      <div className='social-wall-item'>
        <div className=' d-flex justify-content-between'>
          <div className='icon'>
            <SocialWallIcon {...props} />
          </div>
          <div className='d-flex flex-column'>
            <strong className='title'>{title}</strong>
            <span>{content}</span>
          </div>
          <div className='d-flex flex-column from'>
            <span>From: <strong>{from}</strong></span>
            <span className='datetime'>{created_at}</span>
          </div>

        </div>
        <div className='comments'>
          {comments.map((item, index) => {
            return <div className='comment' key={`commentItem-${index}`}>
              <div>
                <b>{item.fromUser}</b>
                {
                  isManager &&
                  <span className='deleteComment' onClick={() => DeleteActivityEvent(confirmRef, item.id)}>Delete</span>
                }
              </div>
              <div dangerouslySetInnerHTML={createMarkup(item.comment)}/>
              <div className='commentDate'>{item.created_at_formated}</div>
            </div>
          })}
        </div>
      </div>
    );
  };

  const comProps = {
    program: props.program, postAvatar, title, content, TimeAgo, TimeZone, from, created_at, commentEvent, comments, DeleteActivityEvent, createMarkup, isManager, confirmRef, id, storageUrl, defaultAvatar, template
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