
import axios from 'axios'

import { getCachedProgramTree, cacheProgramTree } from "@/shared/helpers";

export const getProgramTree = async(organizationId, programId) => {
    const response = await axios.get(`/organization/${organizationId}/program/${programId}/descendents?includeSelf=1`)
    // console.log(response)
    return response.data
}

//Built specifically to get programTree from cache if present or get from API and set in cache as well. set hydrate to force getting from api but supply organizationId & rootProgramId
export const getSetProgramTree = async (hydrate = false, organizationId = null, rootProgramId = null) => {
    const cachedTree = getCachedProgramTree()
    if( cachedTree && !hydrate ) {
        return cachedTree;
    } else {
        if( !organizationId  || !rootProgramId ) {
            throw ("organizationId and rootProgramId are required")
        }
        const p = await getProgramTree(organizationId, rootProgramId);
        cacheProgramTree(p);
        return p;
    }
}