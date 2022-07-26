
import axios from 'axios'

export const getLeaderboard = async(organizationId, programId, leaderboardId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/leaderboard/${leaderboardId}`)
    // console.log(response)
    return response.data
}