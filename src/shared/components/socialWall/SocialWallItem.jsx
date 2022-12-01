import React, {useState, useRef} from 'react';
import PlusCircleIcon from 'mdi-react/PlusCircleIcon';
import SocialWallIcon from './SocialWallIcon';
import {Button} from "reactstrap";
import TemplateButton from "@/shared/components/TemplateButton"

const SocialWallItem = (props) => {
  const {id, title, content, from, created_at, icon, comments} = props.data;
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
  )
}

export default SocialWallItem;
