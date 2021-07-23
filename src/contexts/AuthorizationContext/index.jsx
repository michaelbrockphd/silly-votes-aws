// Sourced from: https://dev.to/finiam/predictable-react-authentication-with-the-context-api-g10

import jwt from 'jsonwebtoken';
import {
    createContext,
    useContext,
    useMemo,
    useState
} from 'react';
import { Auth, Cache } from 'aws-amplify';
import { useEffect } from 'react';

const IsAuthenticatedContext = createContext( false );

export function AuthorizationProvider( {children} ) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then( user => {
                if( user ) {
                    console.log( user );

                    setUser( user );

                    setIsLoggedIn( true );
                }
            } )
            .catch( err => {
                console.log( err );
            } );
    }, [] );
    
    async function logout() {
        setIsLoggedIn(false);
        setUser(null);

        Auth.signOut()
            .then( () => {
                console.log( "Signout complete" );
            } )
            .catch( err => {
                console.log( `Signout err: ${err}` );
            } );
    };

    function currentUser() {
        var rtn = null;

        if( user ) {
            rtn = {
                username: user.username,
                email: user.attributes.email
            };
        }

        return( rtn );
    };

    const memoedValue = useMemo(
        () => ({
          isLoggedIn,
          currentUser,
          logout
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
