import axios from 'axios'

export const getSocialWallPostTypeEvent = async (organizationId, programId) => {

    try {
        const response = await axios.get(
            `/organization/${organizationId}/program/${programId}/social-wall-post-type/event`
        );
        const data = response.data;
        // console.log(data)
        return data;
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
};

export const getSocialWallPostTypeMessage = async (organizationId, programId) => {

    try {
        const response = await axios.get(
          `/organization/${organizationId}/program/${programId}/social-wall-post-type/message`
        );
        const data = response.data;
        // console.log(data)
        return data;
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
};

export const getSocialWallPostTypeComment = async (organizationId, programId) => {

    try {
        const response = await axios.get(
          `/organization/${organizationId}/program/${programId}/social-wall-post-type/comment`
        );
        const data = response.data;
        // console.log(data)
        return data;
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
};

export const getSocialWallPostType = async(organizationId, programId, type) => {
    try {
        const response = await axios.get(
          `/organization/${organizationId}/program/${programId}/social-wall-post-type/${type}`
        );
        const data = response.data;
        return data;
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
}
