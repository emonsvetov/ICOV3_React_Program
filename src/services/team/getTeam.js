
import axios from 'axios'

export const getTeam = async(organizationId, programId, teamId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/team/${teamId}`)
    // console.log(response)
    return response.data
}