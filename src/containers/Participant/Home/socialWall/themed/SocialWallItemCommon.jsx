import TemplateButton from "@/shared/components/TemplateButton"
import {createMarkup} from '@/shared/helpers'

const SocialWallItemCommon = (props) => {
  const {
    program, postAvatar, title, content, TimeAgo, TimeZone, from, created_at, commentEvent, comments, DeleteActivityEvent, createMarkup, isManager, confirmRef, id, storageUrl, defaultAvatar, icon
  } = props

  const CommentsRenderer = ({comments}) => {
    let html = []
    comments.map((item, index) => {
        const commentAvatar = item.avatar ? storageUrl + item.avatar : defaultAvatar;
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