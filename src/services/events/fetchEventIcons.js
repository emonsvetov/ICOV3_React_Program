 
 import axios from 'axios'
 export const fetchEventIcons = async(organizationId) => {
    try {
        const response = await axios.get(`/organization/${organizationId}/event_icons`);
        return response.data
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
};