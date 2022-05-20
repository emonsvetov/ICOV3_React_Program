
import {getPointBalance} from '@/services/user/getPointBalance'

export const AUTH_USER_KEY = 'authUser';
export const AUTH_TOKEN_KEY = 'authToken';
export const AUTH_POINTS_KEY = 'authPoints';
export const AUTH_PROGRAM_KEY = 'authProgram';
export const AUTH_ORGANIZATION_KEY = 'authOrganization';
export const AUTH_CART = 'authCart';

export const login = data => {
    localStorage.setItem(AUTH_TOKEN_KEY, data.access_token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
    localStorage.setItem(AUTH_ORGANIZATION_KEY, JSON.stringify(data.organization));
    localStorage.setItem(AUTH_PROGRAM_KEY, JSON.stringify(data.program));
}

export const logout = (e) => {
    // alert("Hello")
    if( window.confirm( 'Are you sure to log out?') )    {
        flushUserSession();
        window.location = '/login';
    }
    e.preventDefault();
}

export const flushUserSession = () => {
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_ORGANIZATION_KEY);
    localStorage.removeItem(AUTH_PROGRAM_KEY);
    localStorage.removeItem(AUTH_POINTS_KEY);
    localStorage.removeItem(AUTH_CART);
}

export const isAuthenticated = () => {
    // localStorage.removeItem(AUTH_POINTS_KEY);
    // flushUserSession();
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
        // console.log(getAuthUser())
        return true;
    }
    return false;
}

export const getToken = () => {
   return localStorage.getItem(AUTH_TOKEN_KEY);
}

export const getAuthProgram = () => {
    return JSON.parse(localStorage.getItem(AUTH_PROGRAM_KEY));
}

export const setAuthPoints = (points) => {
    localStorage.setItem(AUTH_POINTS_KEY, JSON.stringify(points));
}

export const getAuthPoints = async() => {
    // let storagePoints = localStorage.getItem(AUTH_POINTS_KEY)
    // // console.log(storagePoints)
    // // console.log(storagePoints!=='undefined' && storagePoints)
    // if( storagePoints!=='undefined' && storagePoints ) {
    //     // console.log(storagePoints)
    //     return JSON.parse(storagePoints)
    // }
    return hydratePointBalance();
}

export const hydratePointBalance = () => {
    const authOrg = getOrganization()
    const authProgram = getAuthProgram()
    const authUser = getAuthUser()
    if( !authUser ) return;
    return getPointBalance(authOrg.id, authProgram.id, authUser.id)
    .then( points => {
        // console.log(points)
        setAuthPoints(points)
        return points
    })
} 

export const setAuthProgram = (program) => {
    return localStorage.setItem(AUTH_PROGRAM_KEY, JSON.stringify(program));
}

export const getBearer = () => {
    // console.log(getAuthUser())
    const AuthToken = getToken();
    // console.log(AuthToken)
    return AuthToken ? 'Bearer ' + AuthToken : null
}

export const getAuthUser = () => {
    try {
        const authUser = JSON.parse(localStorage.getItem(AUTH_USER_KEY))
        // console.log(authUser)
        return authUser
    } catch (e) {
        return null;

    }
}

export const getOrganization = () => {
    //get from AuthUser TODO
    // return ORGANIZATION
    return JSON.parse(localStorage.getItem(AUTH_ORGANIZATION_KEY));
}

export const getAuthUserFullname = () => {
    const user = getAuthUser();
    // console.log(isVerified())
    if( user ) return `${user.first_name} ${user.last_name}`
}

export const asyncLocalStorage = {
    setItem: async function (key, value) {
        await null;
        return localStorage.setItem(key, value);
    },
    getItem: async function (key) {
        await null;
        return localStorage.getItem(key);
    }
};

export const getAuthCart = () => {
    // localStorage.removeItem(AUTH_CART);
    const cartdata = localStorage.getItem(AUTH_CART);
    if (cartdata !== null) {
        let acart = JSON.parse(cartdata);
        return acart;
    }  else return null
}

export const updateAuthCart = (datacart) => {
    localStorage.setItem(AUTH_CART, JSON.stringify(datacart) );
    return true;
}

export const emptyAuthCart = () => {
    localStorage.removeItem(AUTH_CART);
}