import { handleActions } from 'redux-actions';
import {
    setAuthProgram
} from '../actions/programActions';

const defaultState = null

export default handleActions(
    {
        [setAuthProgram](state, action) {
            return action.payload;
        }
    },
    defaultState,
);
