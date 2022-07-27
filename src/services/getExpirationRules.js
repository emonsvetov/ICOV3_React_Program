import axios from 'axios'

export const getExpirationRules = async() => {
    try {
        const response = await axios.get(
        `/expirationrule`
        );
        // console.log(response)
        const results = response.data;
        return results;
    } catch (e) {
        throw new Error(`API error:${e?.message}`)
    }
}