import axios from 'axios'

export const getEvents = async(organization,program) => {
    try {
        console.log('test events'+organization);
        const response = await axios.get(
        `/organization/${organization}/program/${program}/event`
        );
        // console.log(response)
        const results = response.data;
        return results;
    } catch (e) {
        throw new Error(`API error:${e?.message}`)
    }
}