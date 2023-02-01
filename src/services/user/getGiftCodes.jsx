
import axios from 'axios'

export const getGiftCodes = async(organizationId, programId, userId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/user/${userId}/gift-codes`)
    // console.log(response)
    return response.data
}