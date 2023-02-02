import axios from 'axios'

export const getGoalPlans = async(organization,program,status) => {
    try {
        //console.log('test goal plans'+organization);
        const response = await axios.get(
        `/organization/${organization}/program/${program}/goalplan?status=${status}`
        );
        const results = response.data;
        return results;
    } catch (e) {
        throw new Error(`API error:${e?.message}`)
    }
}