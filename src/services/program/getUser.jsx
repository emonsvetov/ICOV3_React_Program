
import axios from 'axios'

export const getUser = async(organizationId, programId, userId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/user/${userId}`)
    // console.log(response)
    return response.data
}