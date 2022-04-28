
import axios from 'axios'

export const getEvent = async(organizationId, programId, eventId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/event/${eventId}`)
    // console.log(response)
    return response.data
}