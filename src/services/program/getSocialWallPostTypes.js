import axios from 'axios'

export const getSocialWallPostTypeEvent = async (organizationId, programId) => {

    try {
        const response = await axios.get(
            `/organization/${organizationId}/program/${programId}/social-wall-post-type/event`
        );
        if (response.data.length === 0) return {results: [], count: 0}
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
        if (response.data.length === 0) return {results: [], count: 0}
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
        if (response.data.length === 0) return {results: [], count: 0}
        const data = response.data;
        // console.log(data)
        return data;
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
};
