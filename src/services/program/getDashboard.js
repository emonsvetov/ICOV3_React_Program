
import axios from 'axios'

export const getDashboard = async(organizationId, programId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/dashboard`)
    // console.log(response)
    return response.data
}

export const getDashboardTopMerchants = async(organizationId, programId, duration, unit) => {
    unit = unit === '$' ? 0 : 1;
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/dashboard/top-merchants/${duration}/${unit}`)
    // console.log(response)
    return response.data
}

export const getDashboardTopAwards = async(organizationId, programId, duration, unit) => {
    unit = unit === '$' ? 0 : 1;
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/dashboard/top-awards/${duration}/${unit}`)
    // console.log(response)
    return response.data
}

export const getDashboardAwardDetail = async(organizationId, programId, duration, unit) => {
    unit = unit === '$' ? 0 : 1;
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/dashboard/award-detail/${duration}/${unit}`)
    return response.data
}

export const getDashboardAwardPeerDetail = async(organizationId, programId, duration, unit) => {
    unit = unit === '$' ? 0 : 1;
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/dashboard/award-peer-detail/${duration}/${unit}`)
    return response.data
}