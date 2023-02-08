
import axios from 'axios'
import {prepareRequestParams} from '@/shared/helper'

export const getReferralNotificationRecipients = async(organizationId, programId, filter = null) => {

    const response = await axios.get(`/organization/${organizationId}/program/${programId}/referral-notification-recipient`)
    return response.data
}