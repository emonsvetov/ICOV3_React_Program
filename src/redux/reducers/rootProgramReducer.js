import { handleActions } from 'redux-actions';
import {
    setRootProgram
} from '../actions/rootProgramActions';

const defaultState = null

export default handleActions(
    {
        [setRootProgram](state, action) {
            return { ...state, ...action.payload }
        }
    },
    defaultState,
);
