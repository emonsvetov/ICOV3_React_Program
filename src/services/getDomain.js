
import axios from 'axios'

export const getDomain = async( domainName ) => {
    const response = await axios.get(`/domain?domainName=${domainName}`)
    // console.log(response)
    return response.data
}