import axios from 'axios';

// Constants

const PATH_CAMPAIGNS = 'campaigns';
const PATH_CAMPAIGNS_USER = 'usercampaigns';

// Settings

var baseUrl = null;

const setApiUrl = (url) => {
    baseUrl = url;
};

// Class definition

class WebApi {
    getCampaigns() {
        const reqParameters = {
            method: 'get',
            url: `${baseUrl}/${PATH_CAMPAIGNS}`
        };

        return( axios( reqParameters ) );
    }

    addUserCampaign(authToken, freshCampaign) {
        const reqHeaders = {
            Authorization: authToken
        };

        const reqParameters = {
            method: 'post',
            url: `${baseUrl}/${PATH_CAMPAIGNS_USER}`,
            headers: reqHeaders,
            data: freshCampaign
        };

        return( axios( reqParameters ) );
    }

    deleteUserCampaign(authToken, campaign) {
        const reqHeaders = {
            Authorization: authToken
        };

        const reqParameters = {
            method: 'delete',
            url: `${baseUrl}/${PATH_CAMPAIGNS_USER}/${campaign.id}`,
            headers: reqHeaders
        };

        return( axios( reqParameters ) );
    }

    getUserCampaigns(authToken) {
        const reqHeaders = {
            Authorization: authToken
        };

        const reqParameters = {
            method: 'get',
            url: `${baseUrl}/${PATH_CAMPAIGNS_USER}`,
            headers: reqHeaders
        };

        return( axios( reqParameters ) );
    }

    updateUserCampaign(authToken, updateCampaign) {
        const reqHeaders = {
            Authorization: authToken
        };

        const reqParameters = {
            method: 'put',
            url: `${baseUrl}/${PATH_CAMPAIGNS_USER}/${updateCampaign.id}`,
            headers: reqHeaders,
            data: updateCampaign
        };

        return( axios( reqParameters ) );
    }
}

export default new WebApi();

export {
    setApiUrl
};
