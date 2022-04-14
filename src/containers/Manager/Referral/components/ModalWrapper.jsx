import React from 'react';
import { connect } from 'react-redux';
import AddReferralPopup from './AddReferralPopup'
import EditReferralModal from './EditReferralModal'

const MainModalWrapper = ({ organization, program, name, isOpen, setOpen, toggle, referral, setReferral}) => {
    
    const props = {
        isOpen, setOpen, toggle, organization, program, referral, setReferral
    }
    if( !organization?.id || !program?.id ) return 'Loading...'
    return (
        <>
        {
            name==='AddReferral' && <AddReferralPopup {...props} />
            
        }
        {
            name==='EditReferral' && <EditReferralModal {...props} />
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
