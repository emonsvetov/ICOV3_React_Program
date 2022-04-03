export const isProgramManager = (user) => {
    if( !user.isProgramManager ) return true
}
export const isParticipant = (user) => {
    if( !user.isParticipant ) return true
}
export const isAdmin = (user) => {
    if( user.isAdmin ) return true
}