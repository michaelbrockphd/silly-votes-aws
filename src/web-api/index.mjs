import axios from 'axios';



// Constants //////////////////////////////////////////////////////////////////

const PATH_CAMPAIGNS = 'campaigns';
const PATH_CAMPAIGNS_USER = 'usercampaigns';



// Settings ///////////////////////////////////////////////////////////////////

var baseUrl = null;

const setApiUrl = (url) => {
    baseUrl = url;
};



// API Methods ////////////////////////////////////////////////////////////////

const addUserCampaign = (authToken, freshCampaign) => {
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

const deleteUserCampaign = (authToken, campaign) => {
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

const getCampaigns = () => {
    const reqParameters = {
        method: 'get',
        url: `${baseUrl}/${PATH_CAMPAIGNS}`
    };

    return( axios( reqParameters ) );
}

const getUserCampaigns = (authToken) => {
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

const updateUserCampaign = (authToken, updateCampaign) => {
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



// Exportation ////////////////////////////////////////////////////////////////

export {
    setApiUrl
};

const allReducers = {
    addUserCampaign,
    deleteUserCampaign,
    getCampaigns,
    getUserCampaigns,
    updateUserCampaign
};

export default allReducers;
