import React, {useState} from 'react';
import PlusCircleIcon from 'mdi-react/PlusCircleIcon';
import IconImage from './IconImage';


const RewardItem = (props) => {
  const {title, content, from, created_at, icon, comments} = props.data;
  const clickEvent = () => {
    props.setSocialWallPost(props.data)
    props.popupToggle()
  }


  return (
    <div className='reward-item'>
      <div className=' d-flex justify-content-between'>
        <div className='icon'>
          <IconImage {...props} />
        </div>
        <div className='d-flex flex-column'>
          <strong>{title}</strong>
          <span>{content}</span>
        </div>
        <div className='d-flex flex-column'>
          <span>From: <strong>{from}</strong></span>
          <span className='datetime'>{created_at}</span>
        </div>
        {props.program.uses_social_wall &&
          <div className='flex-column'>
            <div className='red comment-btn ' onClick={clickEvent}>
              <PlusCircleIcon/>
              comment
            </div>
          </div>
        }
      </div>
      <div className='comments'>
        {comments.map((item, index) => {
          return <div className='comment' key={`commentItem-${index}`}>
            <div><b>{item.fromUser}</b></div>
            {item.comment}
          </div>
        })}
      </div>
    </div>
  )
}

export default RewardItem;
