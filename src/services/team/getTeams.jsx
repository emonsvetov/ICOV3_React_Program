
import axios from 'axios'
import {prepareRequestParams} from '@/shared/helpers'

export const getTeams = async(organizationId, programId, filter = null) => {

    const response = await axios.get(`/organization/${organizationId}/program/${programId}/team`)
    return response.data
}