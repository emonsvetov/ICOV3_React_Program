
import axios from 'axios'

export const getUsers = async(organizationId, programId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/user`)
    // console.log(response)
    const data = {
        results: response.data.data,
        count: response.data.total
    };
    return data
}