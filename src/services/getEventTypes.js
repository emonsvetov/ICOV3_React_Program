
import axios from 'axios'

export const getEventTypes = async(orgId, pId) => {
    try {
        const response = await axios.get(
        `/organization/${orgId}/program/${pId}/eventtype`
        );
        // console.log(response)
        const results = response.data;
        return results;
    } catch (e) {
        throw new Error(`API error:${e?.message}`)
    }
}