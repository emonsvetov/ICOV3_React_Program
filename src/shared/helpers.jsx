import {useDispatch, sendFlashMessage} from "@/shared/components/flash"
import { AUTH_SELECT_PROGRAM_TREE } from "@/containers/App/auth";

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
export const isObject = function(a) {
  return (!!a) && (a.constructor === Object);
};
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

export const validEmail = (email) => {
  return /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/i.test(email)
}

export const createMarkup = (value) => {
  return {__html: value};
}

export const getFirstDay = () => {
  let date = new Date();
  return new Date(date.getFullYear(), 0, 1)
}

export const indexOfAll = (array, searchItem) => {
  let i = array.indexOf(searchItem),
    indexes = [];
  while (i !== -1) {
    indexes.push(i);
    i = array.indexOf(searchItem, ++i);
  }
  return indexes;
}

export const toCurrency = (numberString) => {
  let locale = 'en-US';
  let options = {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2};
  let formatter = new Intl.NumberFormat(locale, options);
  return formatter.format(numberString);
}

export const toPoints = (numberString) => {
  let locale = 'en-US';
  let options = {style: 'decimal', minimumFractionDigits: 3, maximumFractionDigits: 3};
  let formatter = new Intl.NumberFormat(locale, options);
  let number = formatter.format(numberString);
  return number.toString().replace(/\./g, ",");
}

export const showPercentage = (numberString) => {
  let locale = 'en-US';
  let options = {style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2};
  let formatter = new Intl.NumberFormat(locale, options);
  return formatter.format(numberString);
}

export const cacheProgramTree = (tree) => {
  localStorage.setItem(AUTH_SELECT_PROGRAM_TREE, JSON.stringify(tree));
}

export const getCachedProgramTree = () => {
  const cachedTreeStr = localStorage.getItem(AUTH_SELECT_PROGRAM_TREE);
  if( cachedTreeStr ) {
    return JSON.parse(cachedTreeStr)
  }
}

export const isValidUrl = urlString=> {
  try { 
    return Boolean(new URL(urlString)); 
  }
  catch(e){ 
    return false; 
  }
}

export const isBadgeAward = ( event_type_id ) => {
  let type_to_match = event_type_id
  if( isObject(event_type_id) && typeof event_type_id.value !== 'undefined' ) {
      type_to_match = event_type_id.value
  }
  console.log(type_to_match)
  return type_to_match == 5 //badge
  || type_to_match == 6 //peer to peer badge
  || type_to_match == 10 //miglestone badge
}

export const isMilestoneAward = (event_type_name) => {
  return event_type_name == "Milestone Badge" //badge
  || event_type_name == "Milestone Award"
}
