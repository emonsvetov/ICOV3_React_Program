import axios from 'axios'

export const getGoalPlan = async(organizationId, programId, goalplanId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/goalplan/${goalplanId}`)
    // console.log(response)
    return response.data
}