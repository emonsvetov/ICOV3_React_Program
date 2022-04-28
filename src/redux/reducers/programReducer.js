import { handleActions } from 'redux-actions';
import {
    setStoreProgram
} from '../actions/programActions';

const defaultState = null

export default handleActions(
    {
        [setStoreProgram](state, action) {
            return { ...state, ...action.payload }
        }
    },
    defaultState,
);
