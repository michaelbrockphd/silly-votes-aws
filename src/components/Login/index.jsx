// Idea taken from the withAuthenticator component from Amazon.

import {
        AmplifyAuthContainer,
        AmplifyAuthenticator,
        AmplifyContainer
    } from '@aws-amplify/ui-react';
import {
        Button,
        Grid,
        TextField
    } from '@material-ui/core';
import { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useAuthorization } from '../../contexts/AuthorizationContext';

const Login = (authenticatorProps, props) => {
    const {
        isLoggedIn
    } = useAuthorization();

    const {
        returnUrl 
    } = props;

    console.log( props );
    console.log(isLoggedIn);

    return(
        <Fragment>
            {!isLoggedIn &&
                <AmplifyContainer>
                    <AmplifyAuthContainer>
                        <AmplifyAuthenticator {...authenticatorProps} {...props} />
                    </AmplifyAuthContainer>
                </AmplifyContainer>}

            {isLoggedIn &&
                <Redirect to={{
                    pathname: returnUrl,
                    state: { from: props.location }
                }} />}
        </Fragment>
    );
}

export default Login;
