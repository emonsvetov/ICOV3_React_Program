
import axios from 'axios'

export const getDomain = async() => {
    const response = await axios.get(`/domain`)
    // console.log(response)
    return response.data
}