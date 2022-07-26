import axios from 'axios'

export const getLeaderboardEvents = async(organizationId, programId, leaderboardId, assigned) => {
    let endpoint = 'event'
    if( !assigned )  {
        endpoint = 'assignableEvent'
    }
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/leaderboard/${leaderboardId}/${endpoint}`)
    // console.log(response)
    return response.data
}