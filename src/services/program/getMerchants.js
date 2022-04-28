
import axios from 'axios'

export const getMerchants = async(organizationId, programId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/merchant`)
    // console.log(response)
    return response.data
}