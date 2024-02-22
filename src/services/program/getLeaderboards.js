
import axios from 'axios'

export const getLeaderboards = async(organizationId, programId, countOnly = false) => {
    let url = `/organization/${organizationId}/program/${programId}/leaderboard`
    if( countOnly ) {
      url += `?count=true`
    }
    const response = await axios.get(url)
    // console.log(response)
    return response.data
}