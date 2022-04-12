import React from 'react';
import { connect } from 'react-redux';
import GiveRewardPopup from './GiveRewardPopup';
// import SubProgramsModal from './subprogram/SubProgramsModal'

const MainModalWrapper = ({user, organization, program, name, isOpen, setOpen, toggle}) => {
    const props = {
        isOpen, setOpen, toggle, organization, program, user
    }
    if( !organization?.id || !program?.id ) return 'Loading...'
    return (
        <>
        {
            name==='Reward' && <GiveRewardPopup {...props} />
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
