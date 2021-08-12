const createAuthOptions = () => {
    const environment = process.env;

    const rtn = {
        region: environment.REACT_APP_AMP_COG_REGION,
        userPoolId: environment.REACT_APP_AMP_COG_ID_USER_POOL,
        userPoolWebClientId: environment.REACT_APP_AMP_COG_ID_APP_CLIENT,
        identityPoolId: environment.REACT_APP_AMP_COG_ID_IDENTITY_POOL
    };
    
    return(rtn);
};

export {
    createAuthOptions
};
