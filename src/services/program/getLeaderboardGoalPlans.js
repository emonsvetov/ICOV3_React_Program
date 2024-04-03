import axios from 'axios'

export const getLeaderboardGoalPlans = async(organizationId, programId, leaderboardId, assigned) => {
    let endpoint = 'goal-plan'
    if( !assigned )  {
        endpoint = 'assignableGoalPlan'
    }
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/leaderboard/${leaderboardId}/${endpoint}`)
    // console.log(response)
    return response.data
}