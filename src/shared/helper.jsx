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