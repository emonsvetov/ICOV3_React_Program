import axios from 'axios'
export const getTransferMonies = async (organizationId, programId) => {
    const response = await axios.get(
        `/organization/${organizationId}/program/${programId}/transferMonies`
    );
    // console.log(response)
    return response.data;
};
export const postTransferMonies = async (organizationId, programId, data) => {
    const response = await axios.post(
        `/organization/${organizationId}/program/${programId}/transferMonies`,
        data
    );
    return response.data;
};
export const downloadTransferTemplate = async(organizationId, programId) => {
    const response = await axios.get(
        `/organization/${organizationId}/program/${programId}/transferMonies/template`, 
        {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        }
    )
    return response;
}
export const uploadTransferTemplate = async(organizationId, programId, data) => {
    const response = await axios.post(
        `/organization/${organizationId}/program/${programId}/transferMonies/template`,
        data,
        {
            headers: {
                "Content-type": "multipart/form-data"
            }
        }
    )
    return response;
}
export const initCcdeposit = async (organizationId, programId, data) => {
    data = {...data, ...{payment_kind: "creditcard",request_type: "init"}}
    const response = await axios.post(
        `/organization/${organizationId}/program/${programId}/creditcardDeposit`,
        data
    );
    return response.data;
}
export const settleCcdeposit = async (organizationId, programId, data) => {
    data = {...data, ...{payment_kind: "creditcard",request_type: "settlement"}}
    console.log(data)
    const response = await axios.post(
        `/organization/${organizationId}/program/${programId}/creditcardDeposit`,
        data
    );
    return response.data;
}