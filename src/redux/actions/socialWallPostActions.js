import {createAction} from 'redux-actions';
import axios from 'axios';

export const setSocialWallPostType = createAction('SET_SOCIAL_WALL_POST_TYPE');
export const SocialWallPostSuccess = createAction('SET_SOCIAL_WALL_POST');

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

export const deleteSocialWallPost = (organizationId, programId, socialWallPostId) => {
  return (dispatch) => {
    return axios.delete(`/organization/${organizationId}/program/${programId}/social-wall-post/${socialWallPostId}`)
      // , { headers: {"Authorization" : `Bearer ${accessToken}`} })
      .then(response => {
        console.log(response.data);
        dispatch(SocialWallPostSuccess(response.data))
      })
      .catch(e => {
        throw new Error(`API error:${e?.message}`);
      });
  };
};

