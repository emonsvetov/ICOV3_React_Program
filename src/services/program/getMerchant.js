
import axios from 'axios'

export const getMerchant = async(organizationId, programId, merchantId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/merchant/${merchantId}`)
    // console.log(response)
    return response.data
}