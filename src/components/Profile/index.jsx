import { Fragment } from 'react';
import { Typography } from '@material-ui/core';

import UserCampaignsContainer from '../../containers/UserCampaignsContainer';

const Profile = () => {
    return(
        <Fragment>
            <Typography variant="h6">Your Campaigns</Typography>

            <UserCampaignsContainer />
        </Fragment>
    );
};

export default Profile;
