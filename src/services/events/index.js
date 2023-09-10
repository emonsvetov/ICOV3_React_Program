import axios from 'axios'

export const deleteIcon = async (program, icon) => {
    try {
      return await axios.delete(`/organization/${program.organization_id}/event_icons/${icon.id}`);
    } catch (e) {
      throw new Error(`API error:${e?.message}`);
    }
}

export const fetchEventIcons = async(program, include = '') => {
    try {
        let url = `/organization/${program.organization_id}/event_icons`
        if( include )   {
            url += '?include=' + include
        }
        const response = await axios.get(url);
        return response.data
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
};

export const getEventLedgerCodes = async(organizationId, programId) => {
    try {
        const response = await axios.get(`/organization/${organizationId}/program/${programId}/ledgercode`);
        return response.data
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
  };