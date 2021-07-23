// Idea taken from the withAuthenticator component from Amazon.

import {
        withAuthenticator
    } from '@aws-amplify/ui-react';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
    const {
        returnUrl 
    } = props;

    return(
        <Redirect
            to={{
            pathname: returnUrl,
            state: { from: props.location }
        }} />
    );
}

export default withAuthenticator( Login );
