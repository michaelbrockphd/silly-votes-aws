const createAuthOptions = () => {
    const environment = process.env;

    const rtn = {
        region: environment.REACT_APP_AMP_COG_REGION,
        userPoolId: environment.REACT_APP_AMP_COG_ID_USER_POOL,
        userPoolWebClientId: environment.REACT_APP_AMP_COG_ID_APP_CLIENT,
        identityPoolId: environment.REACT_APP_AMP_COG_ID_IDENTITY_POOL,

        /*oauth: {
            domain: environment.REACT_APP_AMP_COG_DOMAIN,
            scope: [ "email" ],
            redirectSignIn: environment.REACT_APP_AMP_COG_URL_POST_SIGN_IN,
            redirectSignOut: environment.REACT_APP_AMP_COG_URL_POST_SIGN_OUT,
            responseType: "code"  // code or token
        },

        federationTarget: "COGNITO_USER_POOLS",*/

        cookieStorage: {
            domain: 'localhost',
            secure: false,
            path: '/',
            expires: 365,
          }
    };
    
    return(rtn);
};

export {
    createAuthOptions
};
