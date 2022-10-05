import React from 'react';
import { connect } from 'react-redux';
import GiveRewardPopup from './GiveRewardPopup';
import ResendInviteModal from './ResendInviteModal';
import ChangeStatusModal from './ChangeStatusModal';
import PeerAllocationPopup from "./PeerAllocationPopup";
// import SubProgramsModal from './subprogram/SubProgramsModal'

const MainModalWrapper = ({user, organization, program, name, isOpen, setOpen, toggle, participants, auth}) => {
    const props = {
        isOpen, setOpen, toggle, organization, program, user, participants, auth
    }
    if( !organization?.id || !program?.id ) return 'Loading...'
    return (
        <>
        {
            name==='Reward' && <GiveRewardPopup {...props} />
        }
        {
            name==='Resend Invite' && <ResendInviteModal {...props} />
        }
        {
            (name==='Deactivate' || name==='Activate') && <ChangeStatusModal {...props} />
        }
        {
          name==='Peer Allocation' && <PeerAllocationPopup {...props} />
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
