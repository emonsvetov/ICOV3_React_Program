import React from 'react';
import { connect } from 'react-redux';
import AddEventPopup from './AddEventPopup'
import AddGoalPlanPopup from './AddGoalPlanPopup'
import EditEventModal from './EditEventModal'
import AddLeaderboardModal from './AddLeaderboardModal'

const ModalWrapper = ({ organization, program, name, isOpen, setOpen, toggle, event, setEvent, leaderboard, setLeaderboard}) => {
    
    const props = {
        isOpen, setOpen, toggle, organization, program, event, setEvent, leaderboard, setLeaderboard
    }
    console.log(leaderboard, '-----------')
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
        {
            name==='AddLeaderboard' && <AddLeaderboardModal {...props} />
            
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
export default connect(mapStateToProps)(ModalWrapper);
