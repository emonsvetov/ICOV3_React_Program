import axios from 'axios'

export const getUserEventHistory = async(organizationId, programId, userId, page = 0 , pageSize = 10) => {
    let paramStr = ''
    const response = await axios.get(
        `/organization/${organizationId}/program/${programId}/user/${userId}/event-history?page=${page + 1}&pageSize=${pageSize}&${paramStr}`
    );
    if (response.data.length === 0) return {results: [], count: 0}
    const data = {
        results: response.data.data,
        count: response.data.total
    };
    // console.log(data)
    return data;
}