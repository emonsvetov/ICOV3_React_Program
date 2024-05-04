
import axios from 'axios'

const getCsvImportTypeOptions = async (organizationId, programId, context = '') => {
    try {
        let url = `/organization/${organizationId}/program/${programId}/importtype`;
        if( context ) {
          url += `?context=${context}`
        }
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
}
export default getCsvImportTypeOptions