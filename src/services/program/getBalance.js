
import axios from 'axios'

export const getBalance = async(organizationId, programId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/balance`)
    // console.log(response)
    return response.data
}