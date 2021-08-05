import axios from 'axios';

// Constants

const PATH_CAMPAIGNS = '/campaigns';
const PATH_CAMPAIGNS_USER = '/usercampaigns';

// Settings

var baseUrl = null;

const setApiUrl = (url) => {
    baseUrl = url;
};

// Class definition

class WebApi {
    getCampaigns() {
        const parameters = {
            method: 'get',
            url: `${baseUrl}/${PATH_CAMPAIGNS}`
        };

        return( axios( parameters ) );
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

    getUserCampaigns(authToken) {
        const reqHeaders = {
            Authorization: authToken
        };

        const parameters = {
            method: 'get',
            url: `${baseUrl}/${PATH_CAMPAIGNS_USER}`,
            headers: reqHeaders
        };

        return( axios( parameters ) );
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

export {
    setApiUrl
};
