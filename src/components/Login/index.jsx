// Taken from https://ui.dev/react-router-v4-protected-routes-authentication/

import { Button, Grid, TextField } from '@material-ui/core';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useAuthorization } from '../../contexts/AuthorizationContext';

const Login = (props) => {
    const {
        login,
        isLoggedIn
    } = useAuthorization();
        
    const { from } = props.location.state
                  || { from: { pathname: '/' } };

    const [userEmail, setUserEmail] = useState();

    if(isLoggedIn) {
        return <Redirect to={from} />;
    }

    const onChangeEmail = (event) => {
        setUserEmail( event.target.value );
    };

    const onClickLogin = ( event ) => {
        login( {
            email: userEmail
        } );
    };

    return(
        <form className="">
            <Grid container direction="column" spacing={2}>
                <Grid item xs={6}>
                    <TextField label="email"
                                autoComplete="off"
                                value={userEmail}
                                onChange={onChangeEmail} />
                </Grid>

                <Grid item xs={6}>
                    <Button onClick={onClickLogin}
                            variant="contained"
                            color="default"
                            size="small">Login</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default Login;
