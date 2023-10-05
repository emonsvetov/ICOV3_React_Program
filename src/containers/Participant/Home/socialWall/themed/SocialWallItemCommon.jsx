import TemplateButton from "@/shared/components/TemplateButton"
import {createMarkup} from '@/shared/helpers'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useState } from "react";
const SocialWallItemCommon = (props) => {
  const {
    program, postAvatar, title, content, TimeAgo, TimeZone, from, created_at, LikeActivityEvent, commentEvent,like, auth, like_count, comments, DeleteActivityEvent, createMarkup, isManager, confirmRef, id, storageUrl, defaultAvatar, icon
  } = props
  console.log(like, auth?.id, like?.includes(auth?.id))
  const [heartable, setHeartable] = useState(like?.includes(auth?.id));
  const CommentsRenderer = ({comments}) => {
    let html = []

    comments.map((item, index) => {
        const commentAvatar = item.avatar ? storageUrl + item.avatar : defaultAvatar;
        const commentHeartable = item.like?.includes(auth?.id);
        const commentLikeCount = item.likesCount;
        html.push(<div className="social-wall-comment" key={`commentItem-${index}`}>
          <table width="100%">
            <tbody>
            <tr>
              <td>
                <div className="circled-img">
                  <img src={ commentAvatar } alt="avatar" />
                </div>
              </td>
              <td valign="top" width="100%">
                <span className="social-wall-item-from">{item.fromUser}</span>
                {
                  isManager &&
                  <>&nbsp;<span className='deleteComment link underline' onClick={() => DeleteActivityEvent(confirmRef, item.id)}>Delete</span></>
                }
                <div className="right" dangerouslySetInnerHTML={createMarkup(item.comment)}/>
                <span className="social-wall-time"><TimeAgo date={TimeZone(item.created_at_formated)} /></span>

                {item?.comments && item.comments.length > 0 &&  <div className="socialWall__comment-reply-nested"><CommentsRenderer comments={item.comments} /></div>}

              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <div className="social-wall-heart">
                  <FavoriteIcon style={commentHeartable ? { color: 'red', cursor: 'pointer' } : {cursor: 'pointer' }} onClick={()=>LikeActivityEvent(item.id)}/>
                  <span> {commentLikeCount}</span>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>)
      }
    )
    return html
  }

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
            <table className="full-width">
              <tbody>
              <tr>
                <td>
                  <div className="circled-img">
                    <img src={ postAvatar } alt="avatar" />
                  </div>
                </td>
                <td valign="center">
                  {icon && <div className="social-wall-icon"><img src={`${process.env.REACT_APP_API_STORAGE_URL}/${icon}`} /></div>}
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
                  <div dangerouslySetInnerHTML={createMarkup(content)}/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="social-wall-item-from">
            {from}<span>&nbsp;</span>
            <span className="social-wall-time"><TimeAgo date={TimeZone(created_at)}/></span>
            {program?.uses_social_wall &&
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
          <div className="social-wall-heart">
              <FavoriteIcon style={heartable ? { color: 'red', cursor: 'pointer',marginRight:'5px' } : {cursor: 'pointer', marginRight:'5px'}} onClick={()=>LikeActivityEvent(id)}/>
            <span>{like_count}</span>
          </div>
          <div className="social-wall-comments-container ">
            <CommentsRenderer comments={comments} />
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


export default SocialWallItemCommon