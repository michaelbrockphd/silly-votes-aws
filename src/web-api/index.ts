import axios, { AxiosRequestConfig } from 'axios';

// Constants

const PATH_CAMPAIGNS: string = 'campaigns';
const PATH_CAMPAIGNS_USER: string = 'usercampaigns';

// Settings

var baseUrl: string = null;

const setApiUrl = (url) => {
    baseUrl = url;
};

// Class definition

class WebApi {
    getCampaigns() {
        const reqParameters: AxiosRequestConfig = {
            method: 'get',
            url: `${baseUrl}/${PATH_CAMPAIGNS}`
        };

        return( axios( reqParameters ) );
    }

    addUserCampaign(authToken, freshCampaign) {
        const reqHeaders = {
            Authorization: authToken
        };

        const reqParameters: AxiosRequestConfig = {
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

        const reqParameters: AxiosRequestConfig = {
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

        const reqParameters: AxiosRequestConfig = {
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

        const reqParameters: AxiosRequestConfig = {
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
