import {useDispatch, sendFlashMessage} from "@/shared/components/flash"

export const flashDispatch = useDispatch
export const flashMessage = sendFlashMessage

export const isProgramManager = (user) => {
    if( user.isManager ) return true
    return false
}
export const isProgramParticipant = (user) => {
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

export const hasRoleInProgram = (roleName, programId, user) => {
    if( !user || !user?.programRoles || user?.programRoles.length <= 0) return;
    for( var i in user.programRoles) {
      const programRole = user.programRoles[i] ? user.programRoles[i] : null
      // console.log(programRole)
      // console.log(programId)
      if( programRole && programId ) {
        if( programRole.id === programId) {
          // console.log(programRole)
          if( !programRole?.roles || programRole.roles.length <= 0) return false;
          for( var j in programRole.roles) {
            const userRole = programRole.roles[j] ? programRole.roles[j] : null
            if( !userRole ) {
              return false;
            }
            if( userRole.name === roleName) return true;
          }
        }
      }
    }
    return false;
  }

  export const BuildProgramOptions = ({programs, depth = 0}) => {
    let optionsHtml = []
    if( programs.length > 0) {
        programs.map( p => {
            optionsHtml.push(<option key={`program-option-${p.id}`} value={`${p.id}`}>{'-'.repeat(depth)} {p.name}</option>)
            if( p?.children && p.children.length > 0)   {
                depth++;
                optionsHtml.push(<BuildProgramOptions key={`program-option-group-${p.id}`} programs={p.children} depth={depth} />)
            }
        })
    }
    return optionsHtml
}

export const makeLabelizedOptionsFromTree = (programs, depth = 0) => {
    let optionsObject = []
    if( programs.length > 0) {
        programs.map( p => {
            optionsObject.push({
                label: '-'.repeat(depth) + ' ' + p.name,
                value: p.id
            })
            if( p?.children && p.children.length > 0)   {
                depth++;
                optionsObject = [...optionsObject, ...makeLabelizedOptionsFromTree(p.children, depth)]
            }
        })
    }
    return optionsObject
}