import { createAction } from 'redux-actions';
import { getMyPointsDataForParticipant } from '@/services/user/getMyPointsDataForParticipant';
import { getParticipantCurrentPoints } from '@/services/user/getParticipantCurrentPoints';

export const setAuthUser = createAction('SET_AUTH_USER');
export const setPointsDataForParticipant = createAction('SET_POINTS_DATA_FOR_PARTICIPANT');
export const setGiftcodesDataForParticipant = createAction('SET_GIFTCODES_DATA_FOR_PARTICIPANT');
export const setGoalsDataForParticipant = createAction('SET_GOALS_DATA_FOR_PARTICIPANT');
export const setCurrentPointsDataForParticipant = createAction('SET_CURRENT_POINTS_DATA_FOR_PARTICIPANT');

export const getParticipantMypointsAction = (organizationId, programId, userId) => {
    return (dispatch) => {
        getMyPointsDataForParticipant(organizationId, programId, userId)
        .then(mypointsData => {
            // console.log(mypointsData)
            dispatch(setPointsDataForParticipant(mypointsData))
            dispatch(setGiftcodesDataForParticipant({items:[1,2]}))
            dispatch(setGoalsDataForParticipant({items:[3,4]}))
        })
        .catch(e => {
            throw new Error(`API error:${e?.message}`);
        });
    };
};

export const getParticipantCurrentPointsAction = (organizationId, programId, userId) => {
    return (dispatch) => {
        getParticipantCurrentPoints(organizationId, programId, userId)
        .then(currentPoints => {
            // console.log(mypointsData)
            dispatch(setCurrentPointsDataForParticipant(currentPoints))
        })
        .catch(e => {
            throw new Error(`API error:${e?.message}`);
        });
    };
};
