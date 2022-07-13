import { handleActions } from 'redux-actions';
import {
    setTemplate,
} from '../actions/templateActions';

const defaultState = null

export default handleActions(
    {
        [setTemplate](state, action) {
            return { ...state, ...action.payload }
        }
    },
    defaultState,
);
