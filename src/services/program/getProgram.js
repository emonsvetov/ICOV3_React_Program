
import axios from 'axios'

export const getProgram = async(organizationId, programId, only=true) => {
    let url = `/organization/${organizationId}/program/${programId}`
    if( only )
    {
        url += `?only=1`
    }
    const response = await axios.get(url)
    // console.log(response)
    return response.data
}