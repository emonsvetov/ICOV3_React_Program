import React, {useState, useRef} from 'react';
import PlusCircleIcon from 'mdi-react/PlusCircleIcon';
import SocialWallIcon from './SocialWallIcon';
import {Button} from "reactstrap";
import TemplateButton from "@/shared/components/TemplateButton"
import SocialWallCommentModalWrapper from "./SocialWallCommentModalWrapper";
import {connect} from "react-redux";

const SocialWallItem = (props) => {
console.log(props);
  const {id, title, content, from, created_at, icon, comments} = props.data;
  const {template} = props;
  const isManager = props.isManager;
  const confirmRef = props.confirmRef;
  const setDeleteActivityId = props.setDeleteActivityId;

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
                    <SocialWallIcon {...props} />
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
              From: {from}<br/>
              <span className="social-wall-time">{created_at}</span>
            </div>
            <div className="social-wall-comments-container ">
              {comments.map((item, index) => {
                return <div className="social-wall-comment" key={`commentItem-${index}`}>
                  <table width="100%">
                    <tbody>
                    <tr>
                      <td valign="top" width="100%">
                        <span className="social-wall-item-from">{item.fromUser}</span>
                        {
                          isManager &&
                          <span className='deleteComment' onClick={() => DeleteActivityEvent(confirmRef, item.id)}>Delete</span>
                        }
                        <div className="social-wall-comment-text" dangerouslySetInnerHTML={createMarkup(item.comment)}/>
                        <br />
                        <span className="social-wall-time">{item.created_at_formated}</span>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              })}
            </div>
            <div className="social-wall-post-comment-container">
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

  return (
    (template?.name === "Original" && <SocialWallOrigin />) ||
    (template?.name === "New" && <SocialWallNew />)
  );
}

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};
export default connect(mapStateToProps)(SocialWallItem);