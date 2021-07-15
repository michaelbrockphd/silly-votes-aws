import appHeaderStyles from './AppHeader.module.css';

import { Fragment } from 'react';
import { AppBar, Button, Link, Toolbar, Typography } from '@material-ui/core';

import { useAuthorization } from '../../contexts/AuthorizationContext';

export default function AppHeader() {
    const { isLoggedIn, currentUser, logout } = useAuthorization();
    
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" className={appHeaderStyles.companyTitle}>
                    <Link className={appHeaderStyles.companyTitleLink} href="/campaigns">Silly Votes</Link>
                </Typography>
                
                {isLoggedIn &&
                    <Fragment>
                        <Typography className={appHeaderStyles.loggedInUser}>
                            <Link className={appHeaderStyles.loggedInUserLink} href='/profile'>{currentUser().email}</Link>
                        </Typography>

                        <Button onClick={logout} variant="contained" color="default" size="small">Log Out</Button>
                    </Fragment>}

                {!isLoggedIn &&
                    <Button href="/login" variant="contained" color="default" size="small">Log In</Button>}
            </Toolbar>
        </AppBar>
    );
};
