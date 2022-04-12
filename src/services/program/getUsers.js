
import axios from 'axios'

export const getUsers = async(organizationId, programId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/user`)
    // console.log(response)
    return response.data
}