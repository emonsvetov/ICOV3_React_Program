import React from 'react';
import { connect } from 'react-redux';
import SocialWallCommentPopup from './SocialWallCommentPopup';

const SocialWallCommentModalWrapper = ({user, organization, program, name, isOpen, setOpen, toggle, socialWallPost, auth, setSocialWallPosts}) => {
    const props = {
        isOpen, setOpen, toggle, organization, program, user, socialWallPost, auth, setSocialWallPosts
    }
    if( !organization?.id || !program?.id ) return 'Loading...'
    return (
        <>
        {
            <SocialWallCommentPopup {...props} />
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
export default connect(mapStateToProps)(SocialWallCommentModalWrapper);
