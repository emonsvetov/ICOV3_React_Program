
import axios from 'axios'

export const fetchEmailTemplates = async(type) => {
    try {
        const response = await axios.get(
        `/emailtemplate/?type=${type}`
        );
        // console.log(response)
        const results = response.data;
        return results;
    } catch (e) {
        throw new Error(`API error:${e?.message}`)
    }
}