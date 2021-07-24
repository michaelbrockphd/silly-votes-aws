// Sourced from: https://dev.to/finiam/predictable-react-authentication-with-the-context-api-g10

import {
        createContext,
        useContext,
        useMemo,
        useState,
        Fragment
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
    // I'm sure there are better ways, but hopefully this kludge will do for demonstration purposes.
    //
    // M. Brock, 2021-07-24
    const [isInitialised, setIsInitialised] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [user, setUser] = useState(null);

    function updateUser() {
        Auth.currentAuthenticatedUser()
            .then( user => {
                if( user ) {
                    setUser( user );

                    setIsLoggedIn( true );
                }
            } )
            .catch( err => {
                console.log( err );
            } )
            .finally( () => {
                setIsInitialised(true);
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
    
    function logout() {
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
        <IsAuthenticatedContext.Provider value={memoedValue}>
            <Fragment>
                {isInitialised && [children]}
            </Fragment>
        </IsAuthenticatedContext.Provider>
    );
};

export function useAuthorization() {
    return useContext(IsAuthenticatedContext);
}; 
