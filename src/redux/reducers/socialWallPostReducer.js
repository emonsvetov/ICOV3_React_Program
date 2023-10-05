import {handleActions} from 'redux-actions';
import {
  SocialWallPostSuccess, createSocialWallPost, deleteSocialWallPost, setSocialWallPostType, likeSocialWallPost
} from '../actions/socialWallPostActions';

const defaultState = null

export default handleActions(
  {
    [SocialWallPostSuccess](state, action) {
      return {...state, ...{msgSuccess: action.payload}}
    },
    [createSocialWallPost](state, action) {
      return {...state, ...action.payload}
    },
    [deleteSocialWallPost](state, action) {
      return {...state, ...action.payload}
    },
    [likeSocialWallPost](state, action) {
      return {...state,...action.payload}
    },
    [setSocialWallPostType](state, action){
        return { ...state, ...{newPostType: action.payload} };
    },
  },
  defaultState,
);
