import axios from 'axios'

export const getSocialWallPosts = async (organizationId, programId, page = 0 , pageSize = 10, pageFilter = null, pageSortBy = '') => {
    const params = []
    let paramStr = ''
    if (pageFilter) {
        if (pageFilter.status !== 'undefined' && pageFilter.status) params.push(`status=${pageFilter.status}`)
        if (pageFilter.keyword !== 'undefined' && pageFilter.keyword) params.push(`keyword=${pageFilter.keyword}`)
        if (pageFilter.isManager !== 'undefined' && pageFilter.isManager) params.push(`isManager=${pageFilter.isManager}`)
        // console.log(params)
        paramStr = params.join('&')
    }
    if (pageSortBy.length > 0) {
        const sortParams = pageSortBy[0];
        const sortyByDir = sortParams.desc ? 'desc' : 'asc'
        paramStr = `${paramStr}&sortby=${sortParams.id}&direction=${sortyByDir}`
    }
    try {
        const response = await axios.get(
            `/organization/${organizationId}/program/${programId}/social-wall-post?page=${page + 1}&limit=${pageSize}&${paramStr}`
        );
        // console.log(response)
        if (response.data.length === 0) return {results: [], count: 0}
        const data = {
            results: response.data.data,
            count: response.data.total
        };
        // console.log(data)
        return data;
    } catch (e) {
        throw new Error(`API error:${e?.message}`);
    }
};
