
import axios from 'axios'

export const getUser = async(organizationId, userId) => {
    const response = await axios.get(`/organization/${organizationId}/user/${userId}`)
    // console.log(response)
    return response.data
}

const USER_STATUS_PENDING_DEACTIVATION = 4;
export { USER_STATUS_PENDING_DEACTIVATION };
