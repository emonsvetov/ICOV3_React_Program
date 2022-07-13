import { handleActions } from 'redux-actions';
import {
    setDomain,
} from '../actions/domainActions';

const defaultState = null

export default handleActions(
    {
        [setDomain](state, action) {
            return { ...state, ...action.payload }
        }
    },
    defaultState,
);
