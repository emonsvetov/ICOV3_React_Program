
import axios from 'axios'

export const getReferralNotificationRecipient = async(organizationId, programId, referralId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/referral-notification-recipient/${referralId}`)
    // console.log(response)
    return response.data
}