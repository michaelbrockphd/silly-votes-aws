const createAuthOptions = () => {
    const e = process.env;

    const rtn = {
        region: e.REACT_APP_AMP_COG_REGION,
        userPoolId: e.REACT_APP_AMP_COG_ID_USER_POOL,
        userPoolWebClientId: e.REACT_APP_AMP_COG_ID_APP_CLIENT,
        identityPoolId: e.REACT_APP_AMP_COG_ID_IDENTITY_POOL,

        oauth: {
            domain: e.REACT_APP_AMP_COG_DOMAIN,
            scope: [ "email" ],
            redirectSignIn: e.REACT_APP_AMP_COG_URL_POST_SIGN_IN,
            redirectSignOut: e.REACT_APP_AMP_COG_URL_POST_SIGN_OUT,
            responseType: "code"
        },

        federationTarget: "COGNITO_USER_POOLS",

        cookieStorage: {
            domain: 'localhost',
            secure: false,
            path: '/',
            expires: 365,
          }
    };
    
    return(rtn);
};

const createConfig = () => {
    const e = process.env;

    const rtn = {
        apiGateway: {
            REGION: e.REACT_APP_AMP_API_REGION,
            URL: e.REACT_APP_AMP_API_URL
        },

        cognito: {
            REGION: e.REACT_APP_AMP_COG_REGION,
            USER_POOL_ID: e.REACT_APP_AMP_COG_ID_USER_POOL,
            APP_CLIENT_ID: e.REACT_APP_AMP_COG_ID_APP_CLIENT,
            IDENTITY_POOL_ID: e.REACT_APP_AMP_COG_ID_IDENTITY_POOL
        }
    };

    return( rtn );
};

export {
    createAuthOptions,
    createConfig
};
