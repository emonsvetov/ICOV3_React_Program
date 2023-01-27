import axios from 'axios'
export const getParticipantCurrentPoints = async (organizationId, programId, userId) => {
    const response = await axios.get(
        `/organization/${organizationId}/program/${programId}/user/${userId}/participant-points`
    );
    return response.data;
};