
import axios from 'axios'
import {prepareRequestParams} from '@/shared/helper'

export const getTeams = async(organizationId, programId, filter = null) => {

    const response = await axios.get(`/organization/${organizationId}/program/${programId}/team`)
    return response.data
}