import { handleActions } from 'redux-actions';
import { setPointBalance } from '../actions/balanceActions';
// const defaultState = {
//     points: null,
//     amount: null,
//     factor: null,
//     peerBalance: null,
//     pointBalance:null
// }
const defaultState = null

export default handleActions(
    {
        [setPointBalance](state, action) {
            return { ...state, ...action.payload };
        }
    },
    defaultState,
);
