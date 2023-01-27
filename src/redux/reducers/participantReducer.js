import { handleActions } from 'redux-actions';
import {
    setPointsDataForParticipant,
    setGiftcodesDataForParticipant,
    setGoalsDataForParticipant,
    setCurrentPointsDataForParticipant
} from '../actions/userActions';

const defaultState = {
    myPoints: null,
    myGiftcodes: null,
    myGoals: null,
    currentPoints: null
}

export default handleActions(
    {
        [setPointsDataForParticipant]( state, action ) {
            return { ...state, myPoints: action.payload };
        },
        [setGiftcodesDataForParticipant]( state, action ) {
            return { ...state, myGiftcodes: action.payload };
        },
        [setGoalsDataForParticipant]( state, action ) {
            return { ...state, myGoals: action.payload };
        },
        [setCurrentPointsDataForParticipant]( state, action ) {
            return { ...state, currentPoints: action.payload };
        }
    },
    defaultState,
);
