// Sourced from: https://dev.to/finiam/predictable-react-authentication-with-the-context-api-g10

import {
        Auth,
        Hub 
    } from 'aws-amplify';

import jwt from 'jsonwebtoken';
    
import {
        createContext,
        useContext,
        useMemo,
        useState,
        Fragment
    } from 'react';

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

    const [userToken, setUserToken] = useState(null);

    const updateUserToken = () => {
        // https://stackoverflow.com/questions/66010442/get-cognito-user-attributes-in-lambda-function

        Auth.currentSession()
            .then( s => {
                const idT = s.getIdToken();

                if( idT ) {
                    const token = idT.getJwtToken();

                    console.log( token );

                    setUserToken(token);

                    const decoded = jwt.decode(token);

                    setUser( {
                        username: decoded['cognito:username'],

                        email: decoded['email']
                    } );

                    setIsLoggedIn( true );
                }
            } )
            .catch( e => {
                console.log( e );
            } )
            .finally( () => {
                setIsInitialised(true);
            } );
    };

    useEffect(() => {
        updateUserToken();

        // Wire into the Hub to keep the consistency of the login state.

        Hub.listen( 'auth', (data) => {
            switch (data.payload.event) {

                case 'signIn':
                    updateUserToken();
                    break;

                case 'signOut':
                    setIsLoggedIn(false);
                    setUser(null);
                    setUserToken(null);
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

    const currentUser = () => {
        return( user );
    };

    const currentUserToken = () => {
        return( userToken );
    };

    const memoedValue = useMemo(
        () => ({
            isLoggedIn,
            currentUser,
            currentUserToken,
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
