// Sourced from: https://dev.to/finiam/predictable-react-authentication-with-the-context-api-g10

import {
        createContext,
        useContext,
        useMemo,
        useState
    } from 'react';

import {
        Auth,
        Hub 
    } from 'aws-amplify';
    
import {
        useEffect
    } from 'react';

const IsAuthenticatedContext = createContext( false );

export function AuthorizationProvider( {children} ) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [user, setUser] = useState(null);

    function updateUser() {
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
    };

    useEffect(() => {
        updateUser();

        // Wire into the Hub to keep the consistency of the login state.

        Hub.listen( 'auth', (data) => {
            switch (data.payload.event) {

                case 'signIn':
                    updateUser();
                    break;

                case 'signOut':
                    setUser(null);
                    setIsLoggedIn(false);
                    break;
            }
        } );
    }, [] );
    
    async function logout() {
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
