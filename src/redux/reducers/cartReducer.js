import { handleActions } from 'redux-actions';
import {
    setCart, clearCart
} from '../actions/cartActions';

const defaultState = null;

export default handleActions(
    {
        [setCart](state, action) {
            return { ...state, ...action.payload }
        },
        [clearCart]() {
            return { items: [], total_points: 0, total_dollar: 0 }; 
        }
    },
    defaultState,
);
