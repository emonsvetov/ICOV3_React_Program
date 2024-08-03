
import axios from 'axios'

const getCsvImportTypeOptions = async (organizationId, programId, params = null) => {
    try {
        let url = `/organization/${organizationId}/program/${programId}/importtype`;
        let __params = [];
        if( params && typeof params === 'object') {
          for (const [key, value] of Object.entries(params)) {
            __params.push(`${key}=${value}`)
          }
          if( __params.length > 0 ) {
            url += `?${__params.join('&')}`
          }
        }
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
}
export default getCsvImportTypeOptions