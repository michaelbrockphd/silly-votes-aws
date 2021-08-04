import Amplify from 'aws-amplify';

import {useAuthorization} from '../contexts/AuthorizationContext';

// TODO: Make the constants below configurable via a exported method.

const NAME_API = 'sillyvotesampapi';

const PATH_CAMPAIGNS = '/campaigns';
const PATH_CAMPAIGNS_USER = '/usercampaigns';

class WebApi {
    getCampaigns() {
        return( Amplify.API.get( NAME_API, PATH_CAMPAIGNS ) );
    }

    addUserCampaign(authToken, freshCampaign) {
        /*const reqHeaders = {
            Authorization: authToken
        };

        const parameters = {
            method: 'post',
            url: `${baseUrl}/usercampaigns`,
            headers: reqHeaders,
            data: freshCampaign
        };

        return( axios( parameters ) );*/
    }

    deleteUserCampaign(authToken, campaign) {
        /*const reqHeaders = {
            Authorization: authToken
        };

        const parameters = {
            method: 'delete',
            url: `${baseUrl}/usercampaigns/${campaign._id}`,
            headers: reqHeaders,
            data: campaign
        };

        return( axios( parameters ) );*/
    }

    getUserCampaigns(token) {
        return( Amplify.API.get( NAME_API, PATH_CAMPAIGNS_USER ) );
    }

    updateUserCampaign(authToken, updateCampaign) {
        /*const reqHeaders = {
            Authorization: authToken
        };

        const parameters = {
            method: 'put',
            url: `${baseUrl}/usercampaigns/${updateCampaign._id}`,
            headers: reqHeaders,
            data: updateCampaign
        };

        return( axios( parameters ) );*/
    }
}

export default new WebApi();
