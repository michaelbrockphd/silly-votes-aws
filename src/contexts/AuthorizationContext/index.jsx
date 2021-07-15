// Sourced from: https://dev.to/finiam/predictable-react-authentication-with-the-context-api-g10

import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
    createContext,
    useContext,
    useMemo,
    useState
} from 'react';

const authStorage = () => {
    return sessionStorage;
};

const getInitialState = () => {
    var rtnIsLoggedIn = false;

    const token = authStorage().getItem( 'authorization' );

    if(token) {
        const decoded = jwt.decode(token);

        if(decoded) {
            rtnIsLoggedIn = !!decoded.email;
        }
    }

    return rtnIsLoggedIn;
};

const baseUrl = process.env.REACT_APP_FE_WEB_API_URL || 'http://localhost:9000';
const methodNameLogin = 'login';

const IsAuthenticatedContext = createContext( false );

export function AuthorizationProvider( {children} ) {
    const initial = getInitialState();

    const [isLoggedIn, setIsLoggedIn] = useState(initial);

    function getToken() {
        const authHeaderVal = authStorage().getItem( 'authorization' );

        return( authHeaderVal );
    }

    async function login( userDetails ) {
        const reqData = {
            email: userDetails.email
        };

        const parameters = {
            method: 'post',
            url: `${baseUrl}/${methodNameLogin}`,
            data: reqData
        };

        axios( parameters )
            .then( (rsp) => {
                const authHeaderVal = rsp.headers[ 'authorization' ];

                if( authHeaderVal ) {
                    console.log( `authHead: ${authHeaderVal}` );

                    authStorage().setItem( 'authorization', authHeaderVal );

                    setIsLoggedIn(true);
                }
                else {
                    alert( "Login failed, :( " );
                }
            } )
            .catch( (err) => {
                console.log( err );
            } );
    };
    
    async function logout() {
        authStorage().removeItem( 'authorization' );

        setIsLoggedIn(false);
    };

    function currentUser() {
        const token = getToken();

        const decoded = jwt.decode(token);

        return({
            email: decoded.email
        });
    };

    const memoedValue = useMemo(
        () => ({
          isLoggedIn,
          getToken,
          login,
          logout,
          currentUser
        }),
        [isLoggedIn]
      );

    return(
        <IsAuthenticatedContext.Provider value={memoedValue}>{children}</IsAuthenticatedContext.Provider>
    );
};

export function useAuthorization() {
    return useContext(IsAuthenticatedContext);
}; 
