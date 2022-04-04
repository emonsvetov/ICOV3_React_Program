import { handleActions } from 'redux-actions';
import {
    setCart,
} from '../actions/cartActions';

const defaultState = [];

export default handleActions(
    {
        [setCart](state, action) {
            return [...action.payload ];
        }
    },
    defaultState,
);
