import axios from 'axios'

export const getUserGoal = async(organizationId, programId, usergoalId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/usergoal/${usergoalId}`)
    return response.data
}