import {createAction} from 'redux-actions';
import axios from 'axios';

export const SocialWallPostSuccess = (data) => {
  return {
    type: 'SET_SOCIAL_WALL_POST',
    payload: data
  }
};

export const createSocialWallPost = (organizationId, programId, socialWallPostData) => {
  return (dispatch) => {
    return axios.post(`/organization/${organizationId}/program/${programId}/social-wall-post/create`, socialWallPostData)
      .then(response => {
        console.log(response.data);
        dispatch(SocialWallPostSuccess(response.data))
      })
      .catch(e => {
        throw new Error(`API error:${e?.message}`);
      });
  };
};