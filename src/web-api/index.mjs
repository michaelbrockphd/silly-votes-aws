import Amplify from 'aws-amplify';

// TODO: Make the constants below configurable via a exported method.

const NAME_API = 'sillyvotesampapi';

const PATH_CAMPAIGNS = '/campaigns';
const PATH_CAMPAIGNS_USER = '/usercampaigns';

class WebApi {
    getCampaigns() {
        const reqOptions = {
            headers: {},
            response: false
        };

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

    getUserCampaigns() {
        const reqOptions = {
            headers: {},
            response: false
        };

        return( Amplify.API.get( NAME_API, PATH_CAMPAIGNS_USER ) );

        /*const reqHeaders = {
            Authorization: authToken
        };

        const parameters = {
            method: 'get',
            url: `${baseUrl}/usercampaigns`,
            headers: reqHeaders
        };

        return( axios( parameters ) );*/
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
