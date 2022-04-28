
import axios from 'axios'

export const getEventTypes = async() => {
    try {
        const response = await axios.get(
        `/eventtype`
        );
        // console.log(response)
        const results = response.data;
        return results;
    } catch (e) {
        throw new Error(`API error:${e?.message}`)
    }
}