
import axios from 'axios'

export const getLeaderboardLeaders = async(organizationId, programId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/leaderboard-leaders`)
    // console.log(response)
    return response.data
}