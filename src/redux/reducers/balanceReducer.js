import { handleActions } from 'redux-actions';
import { setPointBalance } from '../actions/balanceActions';

const defaultState = {
    points: 0,
    amount: 0,
    factor: 1
};

export default handleActions(
    {
        [setPointBalance](state, action) {
            return { ...state, ...action.payload };
        }
    },
    defaultState,
);
