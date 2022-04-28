
import axios from 'axios'

export const getEvents = async(organizationId, programId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/event/?minimal=true`)
    // console.log(response)
    return response.data
}