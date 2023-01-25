import axios from 'axios'
export const getMyPointsDataForParticipant = async (organizationId, programId, userId) => {
    const response = await axios.get(
        `/organization/${organizationId}/program/${programId}/user/${userId}/mypoints`
    );
    return response.data;
};