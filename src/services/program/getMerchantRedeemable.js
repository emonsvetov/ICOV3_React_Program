
import axios from 'axios'

export const getMerchantRedeemable = async(organizationId, programId, merchantId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/merchant/${merchantId}/redeemable`)
    // console.log(response)
    return response.data
}