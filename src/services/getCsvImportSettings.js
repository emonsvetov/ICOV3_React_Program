
import axios from 'axios'

const getCsvImportSettings = async (organizationId, programId, csvImportTypeId) => {
    try {
        const url = `/organization/${organizationId}/program/${programId}/csv-import-setting/${csvImportTypeId}`;
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
}
export default getCsvImportSettings