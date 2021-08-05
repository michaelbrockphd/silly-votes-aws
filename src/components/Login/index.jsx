// Idea taken from the withAuthenticator component from Amazon.

import {
        Button,
        Grid,
        TextField,
        Typography
    } from '@material-ui/core';

import {
        Fragment,
        useState
    } from 'react';

import {
        Redirect
    } from 'react-router-dom';

import {useAuthorization} from '../../contexts/AuthorizationContext';

const Login = (props) => {
    const {
        returnUrl 
    } = props;

    const {
        isLoggedIn,
        login
    } = useAuthorization();

    const [userName, setUserName] = useState("");

    const [userPassword, setUserPassword] = useState("");

    const onChangeUserName = (event) => {
        setUserName(event.target.value);
    };

    const onChangeUserPassword = (event) => {
        setUserPassword(event.target.value);
    };

    const onClickLogin = (event) => {
        login( userName, userPassword );
    };

    return(
        <Fragment>
            {isLoggedIn &&
                <Redirect
                    to={{
                        pathname: returnUrl,
                        state: { from: props.location }
                    }} />}

            {!isLoggedIn &&
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Typography variant="body1">Existing Login</Typography>
                    </Grid>

                    <Grid item xs={8}>
                        <TextField label="username"
                                autoComplete="off"
                                value={userName}
                                onChange={onChangeUserName} />
                    </Grid>

                    <Grid item xs={8}>
                        <TextField label="password"
                                autoComplete="off"
                                type="password"
                                value={userPassword}
                                onChange={onChangeUserPassword} />
                    </Grid>

                    <Grid item xs={8}>
                        <Button variant="contained"
                                colour="default"
                                size="small"
                                onClick={onClickLogin}>Login</Button>
                    </Grid>
                </Grid>}
        </Fragment>
    );
}

export default Login;
