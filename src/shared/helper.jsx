export const isProgramManager = (user) => {
    if( user.isProgramManager ) return true
    return false
}
export const isParticipant = (user) => {
    if( user.isParticipant ) return true
    return false
}
export const isAdmin = (user) => {
    if( user.isAdmin ) return true
    return false
}
export const isSuperAdmin = (user) => {
    if( user.isSuperAdmin ) return true
    return false
}
export const isEmpty = (object) => { for(var i in object) { return false; } return true; }
export const labelizeNamedData = (data, fields = ["id", "name"]) => {
    let newData = []
    for( var i in data) {
        newData.push({label: String(data[i][fields[1]]), value: String(data[i][fields[0]])})
    }
    return newData;
}
export const patch4Select = (data, field, list, cb) => {
    // console.log(list)
    if( typeof data[field] === 'object') return data //in case it is already patched!
    return {
        ...data, 
        ...{
            [field]: {
                label: typeof cb === 'function' ? cb(data[field], list) : getLabelByCode(data[field], list),
                value: String(data[field])
            }
        }
    }
}
export const getLabelByCode = (value, list) => {
    return list.find( item => String(item.value) === String(value) )?.label
}
export const dateStrToYmd = dateString => {
    let date = new Date( dateString )
    return date.toISOString().split('T')[0]
}