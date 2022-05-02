import { handleActions } from 'redux-actions';
import {
    setOrganization,
} from '../actions/organizationActions';

const defaultState = null

export default handleActions(
    {
        [setOrganization](state, action) {
            return { ...state, ...action.payload }
        }
    },
    defaultState,
);
