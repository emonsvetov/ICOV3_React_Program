
import axios from 'axios'

export const getReclaimablePeerPoints = async(organizationId, programId, userId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/user/${userId}/reclaim-peer-points`)
    return response?.data ? response.data : []
}