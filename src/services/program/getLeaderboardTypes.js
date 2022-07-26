
import axios from 'axios'

export const getLeaderboardTypes = async(organizationId, programId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/leaderboardType`)
    // console.log(response)
    return response.data
}