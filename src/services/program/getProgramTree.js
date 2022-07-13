
import axios from 'axios'

export const getProgramTree = async(organizationId, programId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/descendents?includeSelf=1`)
    // console.log(response)
    return response.data
}