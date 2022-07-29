import React from 'react';
import { connect } from 'react-redux';
import RewardCommentPopup from './RewardCommentPopup';

const RewardCommentModalWrapper = ({user, organization, program, name, isOpen, setOpen, toggle, socialWallPost, auth, setSocialWallPosts}) => {
    const props = {
        isOpen, setOpen, toggle, organization, program, user, socialWallPost, auth, setSocialWallPosts
    }
    if( !organization?.id || !program?.id ) return 'Loading...'
    return (
        <>
        {
            <RewardCommentPopup {...props} />
        }
        </>
    )
}
const mapStateToProps = (state) => {
    return {
       auth: state.auth,
       program: state.program,
       organization: state.organization,
    };
};
export default connect(mapStateToProps)(RewardCommentModalWrapper);
