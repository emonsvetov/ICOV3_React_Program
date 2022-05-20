import React from 'react';
import { connect } from 'react-redux';
import AddTeamPopup from './AddTeamPopup'
import EditTeamModal from './EditTeamlModal'

const MainModalWrapper = ({ organization, program, name, isOpen, setOpen, toggle, mate, setMate}) => {
    
    const props = {
        isOpen, setOpen, toggle, organization, program, mate, setMate
    }
    if( !organization?.id || !program?.id ) return 'Loading...'
    return (
        <>
        {
            name==='AddTeam' && <AddTeamPopup {...props} />
            
        }
        {
            name==='EditTeam' && <EditTeamModal {...props} />
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
