import {handleActions} from 'redux-actions';
import {
  SocialWallPostSuccess,
  createSocialWallPost
} from '../actions/socialWallPostActions';

const defaultState = null

export default handleActions(
  {
    [SocialWallPostSuccess](state, action) {
      return {...state, ...action.payload}
    },
    [createSocialWallPost](state, action) {
      return {...state, ...action.payload}
    },
  },
  defaultState,
);