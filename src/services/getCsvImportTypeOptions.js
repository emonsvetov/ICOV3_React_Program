
import axios from 'axios'

const getCsvImportTypeOptions = async (organizationId, context = '') => {
    try {
        let url = `/organization/${organizationId}/importtype`;
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