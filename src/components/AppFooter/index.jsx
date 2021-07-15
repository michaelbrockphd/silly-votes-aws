import appFooterStyles from './AppFooter.module.css';

import { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default class AppFooter extends Component {
    render() {
        return(
            <AppBar position="static">
                <Toolbar>
                    <Typography className={appFooterStyles.copyright}>(c) Michael Brock, 2021.</Typography>
                </Toolbar>
            </AppBar>
        );
    }
};
