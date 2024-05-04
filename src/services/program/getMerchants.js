
import axios from 'axios'

export const getMerchants = async(organizationId, programId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/merchant?status=1`)
    // console.log(response)
    return response.data
}