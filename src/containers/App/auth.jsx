import { getPointBalance } from "@/services/user/getPointBalance";
import { getDomain } from "@/services/getDomain";
import { getProgram } from "@/services/program/getProgram";
import store from "@/containers/App/store";
import { setStoreProgram } from "@/redux/actions/programActions";

export const AUTH_USER_KEY = "authUser";
export const AUTH_TOKEN_KEY = "authToken";
export const AUTH_POINTS_KEY = "authPoints";
export const AUTH_PROGRAM_KEY = "authProgram";
export const AUTH_ROOT_PROGRAM_KEY = "authRootProgram";
export const AUTH_ORGANIZATION_KEY = "authOrganization";
export const AUTH_CART = "authCart";
export const AUTH_DOMAIN_KEY = "icoDomain";
export const AUTH_THEME = "icoTheme";
export const AUTH_SELECT_PROGRAM_TREE = "authSelectProgramTree";
export const DEFAULT_TEMPLATE = {
  big_logo: `logo/big_logo.png`,
  small_logo: `logo/small_logo.png`,
  welcome_message: `Welcome to INCENTCO's Global Solutions rewards site! When you participate in our program, you'll earn rewards for various activities.`,
};

export const login = (data) => {
  localStorage.setItem(AUTH_TOKEN_KEY, data.access_token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
  localStorage.setItem(
    AUTH_ORGANIZATION_KEY,
    JSON.stringify(data.organization)
  );
  localStorage.setItem(AUTH_PROGRAM_KEY, JSON.stringify(data.program));
  localStorage.setItem(AUTH_ROOT_PROGRAM_KEY, JSON.stringify(data.program));
}

export const logout = (isIdle = false) => {
  // alert("Hello")
  if (isIdle || window.confirm("Are you sure to log out?")) {
    flushUserSession();
    window.location = "/login";
  }
  // e.preventDefault();
};

export const flushUserSession = () => {
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_ORGANIZATION_KEY);
  localStorage.removeItem(AUTH_PROGRAM_KEY);
  localStorage.removeItem(AUTH_ROOT_PROGRAM_KEY);
  localStorage.removeItem(AUTH_POINTS_KEY);
  localStorage.removeItem(AUTH_CART);
  localStorage.removeItem(AUTH_DOMAIN_KEY);
  localStorage.removeItem(AUTH_SELECT_PROGRAM_TREE);
  localStorage.removeItem('SELECT_PROGRAM_TREE'); //tmp, remove
};

export const isAuthenticated = () => {
  // localStorage.removeItem(AUTH_POINTS_KEY);
  // flushUserSession();
  if (localStorage.getItem(AUTH_TOKEN_KEY)) {
    // console.log(getAuthUser())
    return true;
  }
  return false;
};

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getAuthProgram = ( hydrate = false ) => {
  let program = JSON.parse(localStorage.getItem(AUTH_PROGRAM_KEY));
  // console.log("getAuthProgram")
  // console.log(program)
  if( hydrate ) {
    return getProgram( program.organization_id, program.id )
    .then( p => {
      setAuthProgram(p)
      store.dispatch(setStoreProgram(p));
      return p
    })
  } else {
    store.dispatch(setStoreProgram(program));
  }
  return program
};

export const getTheme = () => {
  return JSON.parse(localStorage.getItem(AUTH_THEME));
};

export const setTheme = ( theme ) => {
  localStorage.setItem(AUTH_THEME, JSON.stringify(theme));
};

export const getAuthRootProgram = () => {
  return JSON.parse(localStorage.getItem(AUTH_ROOT_PROGRAM_KEY));
};

export const setAuthPoints = (points) => {
  localStorage.setItem(AUTH_POINTS_KEY, JSON.stringify(points));
};

export const getAuthPoints = async () => {
  // let storagePoints = localStorage.getItem(AUTH_POINTS_KEY)
  // // console.log(storagePoints)
  // // console.log(storagePoints!=='undefined' && storagePoints)
  // if( storagePoints!=='undefined' && storagePoints ) {
  //     // console.log(storagePoints)
  //     return JSON.parse(storagePoints)
  // }
  return hydratePointBalance();
};

export const hydratePointBalance = () => {
  const authOrg = getOrganization();
  const authProgram = getAuthProgram();
  const authUser = getAuthUser();
  if (!authUser) return;
  return getPointBalance(authOrg.id, authProgram.id, authUser.id).then(
    (points) => {
      // console.log(points)
      setAuthPoints(points);
      return points;
    }
  );
};

export const setAuthProgram = (program) => {
  return localStorage.setItem(AUTH_PROGRAM_KEY, JSON.stringify(program));
};

// export const getAuthProgram = async( hydrate = false ) => {
//   // flushUserSession();
//   // return;
//   // localStorage.removeItem(AUTH_PROGRAM_KEY);
//   const authProgram = localStorage.getItem(AUTH_PROGRAM_KEY)
//   console.log(authProgram)
//   console.log(typeof authProgram)
//   let program;
//   if( authProgram ) {
//     program = JSON.parse(authProgram)
//     console.log("program")
//     console.log(program)
//   }
//   if( !hydrate ) {
//     return program;
//   }
//   if( hydrate && !program?.id )  {
//     console.log("Invalid request found")
//   }

//   if( hydrate ) {
//     program = getProgram(program.organization_id, program.id)
//     console.log("program in auth.jsx > getAuthProgram")
//     console.log(program)
//     setAuthProgram( program )
//     return program
//   }
// }

export const getBearer = () => {
  // console.log(getAuthUser())
  const AuthToken = getToken();
  // console.log(AuthToken)
  return AuthToken ? "Bearer " + AuthToken : null;
};

export const getAuthUser = () => {
  try {
    const authUser = JSON.parse(localStorage.getItem(AUTH_USER_KEY));
    // console.log(authUser)
    return authUser;
  } catch (e) {
    return null;
  }
};

export const setAuthDomain = (domain) => {
  localStorage.setItem(AUTH_DOMAIN_KEY, JSON.stringify(domain));
};

export const getAuthDomain = async (hydrate = false) => {
  // localStorage.removeItem(AUTH_DOMAIN_KEY);
  const storageDomain = localStorage.getItem(AUTH_DOMAIN_KEY);
  if (hydrate || !storageDomain) return hydrateDomain();
  return JSON.parse(storageDomain);
};

export const hydrateDomain = () => {
    // const host = window.location.host
    // let domainName = host
    // if(host.indexOf(':') !== -1)    {
    //     const pieces = host.split(':')
    //     domainName = pieces[0]
    // }
    return getDomain()
    .then( domain => {
        // console.log(domain)
        if( domain?.program && !domain.program.template) {
            domain.program.template = DEFAULT_TEMPLATE
        }
        setAuthDomain(domain)
        return domain
    }).catch( err => {
        alert(err)
    })
    .catch((err) => {
      alert(err);
    });
};

export const getOrganization = () => {
  //get from AuthUser TODO
  // return ORGANIZATION
  return JSON.parse(localStorage.getItem(AUTH_ORGANIZATION_KEY));
};
export const getAuthUserFullname = () => {
  const user = getAuthUser();
  // console.log(isVerified())
  if (user) return `${user.first_name} ${user.last_name}`;
};

export const asyncLocalStorage = {
  setItem: async function (key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function (key) {
    await null;
    return localStorage.getItem(key);
  },
};

export const getAuthCart = () => {
  // localStorage.removeItem(AUTH_CART);
  const cartdata = localStorage.getItem(AUTH_CART);
  if (cartdata !== null) {
    let acart = JSON.parse(cartdata);
    return acart;
  } else return null;
};

export const updateAuthCart = (datacart) => {
  localStorage.setItem(AUTH_CART, JSON.stringify(datacart));
  return true;
};

export const emptyAuthCart = () => {
  localStorage.removeItem(AUTH_CART);
};
