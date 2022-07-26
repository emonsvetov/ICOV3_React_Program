
import axios from 'axios'

export const getLeaderboards = async(organizationId, programId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/leaderboard`)
    // console.log(response)
    return response.data
}