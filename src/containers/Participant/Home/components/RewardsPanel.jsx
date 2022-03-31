import React from 'react';
import RewardItem from './RewardItem';
import rewardData from './Mockdata.json';

const RewardsPanel = () => {
  return (
    <div className='panel rewards-panel pt-4'>
        {rewardData.map((item, index) =>{
            return <div key={`rewardItem-${index}`} >
            <RewardItem data = {item} />
            <hr className="solid" />
            </div>
        })}
    </div>
      
)}

export default RewardsPanel;
