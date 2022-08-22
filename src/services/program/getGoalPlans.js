import axios from 'axios'

export const getGoalPlans = async(organization,program) => {
    try {
        //console.log('test goal plans'+organization);
        const response = await axios.get(
        `/organization/${organization}/program/${program}/goalplan`
        );
        const results = response.data;
        return results;
    } catch (e) {
        throw new Error(`API error:${e?.message}`)
    }
}