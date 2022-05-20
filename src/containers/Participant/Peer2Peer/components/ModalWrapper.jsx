import React from 'react';
import { connect } from 'react-redux';
import RewardPopup from './RewardPeerPopup';

const MainModalWrapper = ({user, organization, program, name, isOpen, setOpen, toggle, participants}) => {
    const props = {
        isOpen, setOpen, toggle, organization, program, user, participants
    }
    if( !organization?.id || !program?.id ) return 'Loading...'
    return (
        <>
        {
            name==='Reward' && <RewardPopup {...props} />
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
export default connect(mapStateToProps)(MainModalWrapper);
