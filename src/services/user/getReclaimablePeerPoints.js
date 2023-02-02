
import axios from 'axios'

export const getReclaimablePeerPoints = async(organizationId, programId, userId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/user/${userId}/reclaimable-peer-points-list`)
    // console.log(response)
    return response.data
}