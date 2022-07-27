import React from 'react';
import { connect } from 'react-redux';
import AddEventPopup from './AddEventPopup'
import AddGoalPlanModal from './AddGoalPlanModal'
import EditEventModal from './EditEventModal'
import AddLeaderboardPopup from './AddLeaderboardPopup'
import EditLeaderboardModal from './EditLeaderboardModal';

const MainModalWrapper = ({ organization, program, name, isOpen, setOpen, toggle, event, setEvent, leaderboard, setLeaderboard}) => {
    
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
            name==='AddGoal' && <AddGoalPlanModal {...props} />
        }
        {
            name==='AddLeaderboard' && <AddLeaderboardPopup {...props} />
            
        }
        {
            name==='EditLeaderboard' && <EditLeaderboardModal {...props} />
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
