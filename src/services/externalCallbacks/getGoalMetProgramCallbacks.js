import axios from 'axios'

export const getGoalMetProgramCallbacks = async(organizationId, programId, filter = null) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/getGoalMetProgramCallbacks`)
    return response.data
}