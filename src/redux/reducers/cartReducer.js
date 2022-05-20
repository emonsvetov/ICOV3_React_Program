import { handleActions } from 'redux-actions';
import {
    setCart,
} from '../actions/cartActions';

const defaultState = null;

export default handleActions(
    {
        [setCart](state, action) {
            return { ...state, ...action.payload }
        }
    },
    defaultState,
);
