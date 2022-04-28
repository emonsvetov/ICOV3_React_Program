
import axios from 'axios'

export const getPointBalance = async(organizationId, programId, userId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/user/${userId}/balance`)
    // console.log(response)
    return response.data
}