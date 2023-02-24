import axios from 'axios'

export const getGoalExceededProgramCallbacks = async(organizationId, programId, filter = null) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/getGoalExceededProgramCallbacks`)
    return response.data
}