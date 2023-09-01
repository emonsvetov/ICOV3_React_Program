 
 import axios from 'axios'
 export const fetchEventIcons = async(organizationId, include = '') => {
    try {
        let url = `/organization/${organizationId}/event_icons`
        if( include )   {
            url += '?include=' + include
        }
        const response = await axios.get(url);
        return response.data
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
};