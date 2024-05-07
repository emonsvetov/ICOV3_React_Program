
import axios from 'axios'

const getCsvImportTypeFields = async (organizationId, csvImportTypeId) => {
    try {
        let url = `/organization/${organizationId}/importtype/${csvImportTypeId}/fields`;
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
}
export default getCsvImportTypeFields