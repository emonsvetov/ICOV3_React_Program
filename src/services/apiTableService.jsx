//Get paginated data for react-table
import axios from 'axios'

const QUERY_PAGE_INDEX = 0
const QUERY_PAGE_SIZE = 20
const QUERY_PAGE_FILTER = {}
const QUERY_PAGE_SORTBY = []
const QUERY_TRIGGER = 0

export default {

    fetchData: async(queryParams) => {
        // console.log(queryParams)
        
        const queryDefaults = {
            url: '/',
            page: QUERY_PAGE_INDEX,
            size: QUERY_PAGE_SIZE,
            filter: QUERY_PAGE_FILTER,
            sortby: QUERY_PAGE_SORTBY,
            trigger: QUERY_TRIGGER
        }
    
        const options = { ...queryDefaults, ...queryParams }

        // console.log(options)

        const params = []
        let paramStr = ''
        if( options.trigger > 0) {
            params.push(`t=${options.trigger}`)
        }
        if( options.filter ) {
            // console.log(options.filter)
            const fields = Object.keys(options.filter);
            if( fields.length > 0)  {
                for(var i in fields)    {
                    params.push(`${fields[i]}=${options.filter[fields[i]]}`)
                }
            }
            // if(options.filter.keyword !== 'undefined' && options.filter.keyword) params.push(`keyword=${options.filter.keyword}`)
            // if(options.filter.from !== 'undefined' && options.filter.from) params.push(`from=${options.filter.from}`)
            // if(options.filter.to !== 'undefined' && options.filter.to) params.push(`to=${options.filter.to}`)
        }
        if( params.length > 0 ) {
            paramStr = params.join('&')
        }
        // console.log(paramStr)
        if( options.sortby.length > 0 ) {
            const sortParams = options.sortby[0];
            const sortyByDir = sortParams.desc ? 'desc' : 'asc'
            paramStr = `${paramStr}&sortby=${sortParams.id}&direction=${sortyByDir}`
        }
        try {
            const response = await axios.get(
            `${options.url}?page=${options.page+1}&limit=${options.size}&${paramStr}`
            );
            // console.log(response)
            if( response.data.length === 0) return {results:[], count:0}
            const data = {
                results: response.data.data,
                count: response.data.total
            };
            // console.log(data)
            return data;
        } catch (e) {
            throw new Error(`API error:${e?.message}`);
        }
    }
}