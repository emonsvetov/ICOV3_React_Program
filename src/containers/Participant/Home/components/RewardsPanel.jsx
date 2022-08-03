import React, {useEffect, useState} from 'react';
import RewardItem from './RewardItem';
import {getSocialWallPosts} from '@/services/program/getSocialWallPosts'
import RewardCommentModalWrapper from './RewardCommentModalWrapper';

const RewardsPanel = ({organization, program}) => {

  let [socialWallPosts, setSocialWallPosts] = useState(null);
  let [socialWallPost, setSocialWallPost] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Popup
   */
  const popupToggle = () => {
    setOpen(prevState => !prevState)
  };
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (organization && program) {
      setLoading(true)
      getSocialWallPosts(organization.id, program.id, 0, 999999)
        .then(data => {
          // console.log(data)
          setSocialWallPosts(data);
        })
        .catch(error => {
          console.log(error.response.data);
        })
    }
  }, [organization, program])

  if (!socialWallPosts) return 'Loading...'


  return (
    <div className='panel rewards-panel pt-4'>
      {socialWallPosts.results.map((item, index) => {
        return <div key={`rewardItem-${index}`}>
          <RewardItem program={program} data={item} popupToggle={popupToggle} setSocialWallPost={setSocialWallPost}/>
          <hr className="solid"/>
        </div>
      })}
      <RewardCommentModalWrapper isOpen={isOpen} setOpen={setOpen} toggle={popupToggle} socialWallPost={socialWallPost} setSocialWallPosts={setSocialWallPosts}  />
    </div>
  )
}

export default RewardsPanel;
