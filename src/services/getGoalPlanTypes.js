import axios from 'axios'

export const getGoalPlanTypes = async() => {
    try {
        const response = await axios.get(
        `/goalplantype`
        );
        // console.log(response)
        const results = response.data;
        return results;
    } catch (e) {
        throw new Error(`API error:${e?.message}`)
    }
}