
import axios from 'axios'

export const getUser = async(organizationId, userId) => {
    const response = await axios.get(`/organization/${organizationId}/user/${userId}`)
    // console.log(response)
    return response.data
}