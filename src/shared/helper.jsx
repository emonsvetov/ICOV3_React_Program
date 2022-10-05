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
    if (!data) return null
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

function arrayCompare(a1, a2) {
  if (a1.length != a2.length) return false;
  var length = a2.length;
  for (var i = 0; i < length; i++) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
}

export const inArray = (needle, haystack) => {
  if(!haystack || typeof haystack === 'undefined') return;
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
    if(typeof haystack[i] == 'object') {
      if(arrayCompare(haystack[i], needle)) return true;
    } else {
      if(haystack[i] == needle) return true;
    }
  }
  return false;
}

export const mapFormDataUploads = (values, multiple = false) => {
  let data = new FormData()
  for (const [key, value] of Object.entries(values)) {
    // console.log(value)
    // console.log(typeof value)
    if(value && typeof value === 'object')  {
      if( multiple )    {
        value.map( itemValue => {
          data.append(`${key}[]`, itemValue)
        })
      }   else {
        data.append(key, value[0])
      }
    }   else {
      data.append(key, value)
    }
  }
  return data
}

export const unpatchMedia = ( dataset, fields ) => {
  if( !dataset || !fields ) return dataset;
  for (const [key, value] of Object.entries(dataset)) {
    if( inArray(key, fields) && (typeof value === 'string' || value === null))  {
      delete dataset[key]
    }
  }
  return dataset
}

export const patchMediaURL = ( dataset, fields ) => {
  if( !dataset || !fields ) return dataset;
  for (const [key, value] of Object.entries(dataset)) {
    if( inArray(key, fields) && value && value.indexOf(process.env.REACT_APP_API_STORAGE_URL) === -1)  {
      dataset[key] = `${process.env.REACT_APP_API_STORAGE_URL}/${value}`
    }
  }
  return dataset
}

export const prepareRequestParams = (filter, fields) => {
  const params = []
  let paramStr = ''
  if (filter) {
    fields.map((field) => (filter[field] !== 'undefined' && filter[field]) ? params.push(field + `=${filter[field]}`) : null);
    paramStr = params.join('&')
  }
  return paramStr;
}
