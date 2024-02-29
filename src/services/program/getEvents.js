
import axios from 'axios'
import {prepareRequestParams} from '@/shared/helpers'

export const getEvents = async(organizationId, programId, filter = null) => {
    let paramStr = prepareRequestParams(filter, ['type', 'except_type', 'disabled']);

    const response = await axios.get(`/organization/${organizationId}/program/${programId}/event?minimal=true&${paramStr}`)
    // console.log(response)
    return response.data
}