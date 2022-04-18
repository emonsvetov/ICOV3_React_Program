import React from 'react';
import { connect } from 'react-redux';
import AddEventPopup from './AddEventPopup'
import AddGoalPlanPopup from './AddGoalPlanPopup'
import EditEventModal from './EditEventModal'

const MainModalWrapper = ({ organization, program, name, isOpen, setOpen, toggle, event, setEvent}) => {
    
    const props = {
        isOpen, setOpen, toggle, organization, program, event, setEvent
    }
    if( !organization?.id || !program?.id ) return 'Loading...'
    return (
        <>
        {
            name==='AddEvent' && <AddEventPopup {...props} />
            
        }
        {
            name==='EditEvent' && <EditEventModal {...props} />
        }
        {
            name==='AddGoal' && <AddGoalPlanPopup {...props} />
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