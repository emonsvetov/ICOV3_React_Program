import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'; 
import RedeemIcon from 'mdi-react/HandHeartIcon';
// import GiftIcon from 'mdi-react/GiftIcon';
// import SurveyIcon from 'mdi-react/NoteTextIcon';
// import SubmitIcon from 'mdi-react/CursorPointerIcon';
const i = 'SubmitIcon';
function TabNav(props ) {   
    const { title, icon } = props;
    return <div className="tab-nav">
                <div className='icon'>
                    <RedeemIcon size={40} className={`${icon}-icon`}/>
                </div>
                <div className='text-center'>
                    <strong>{title}</strong>
                </div>
            </div>
}

TabNav.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
};

TabNav.defaultProps = {
    
}

export default TabNav;
