import axios from 'axios'

export const getEvents = async(organization,program, type='') => {
    try {
        const response = await axios.get(
        `/organization/${organization}/program/${program}/event?type=${type}`
        );
        // console.log(response)
        const results = response.data;
        return results;
    } catch (e) {
        throw new Error(`API error:${e?.message}`)
    }
}