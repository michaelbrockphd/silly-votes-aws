import redux_toolkit from '@reduxjs/toolkit'

import webApi from '../web-api'

// CommonJS Workaround

const {
    createAsyncThunk } = redux_toolkit;


// Constants //////////////////////////////////////////////////////////////////

const STORE_NAME = "campaigns";

const NAME_ADD_USER_CAMPAIGNS = "addUserCampaign"
const NAME_LOAD_ALL_CAMPAIGNS = "loadAllCampaigns"
const NAME_LOAD_ALL_USER_CAMPAIGNS = "loadAllUserCampaigns"


// Thunk Implementations //////////////////////////////////////////////////////

const addUserCampaign = createAsyncThunk(
    `${STORE_NAME}/${NAME_ADD_USER_CAMPAIGNS}`,
    async (payload) => {
        const {
            token,
            campaign } = payload;

        const response = await webApi.addUserCampaign(token, campaign);

        return response.data;
    }
);

const loadAllCampaigns = createAsyncThunk(
    `${STORE_NAME}/${NAME_LOAD_ALL_CAMPAIGNS}`,
    async () => {
        const response = await webApi.getCampaigns();

        return response.data;
    }
);

const loadAllUserCampaigns = createAsyncThunk(
    `${STORE_NAME}/${NAME_LOAD_ALL_USER_CAMPAIGNS}`,
    async (token) => {
        const response = await webApi.getUserCampaigns(token);

        return response.data;
    }
);


// Exportation ////////////////////////////////////////////////////////////////

export {
    addUserCampaign,
    loadAllCampaigns,
    loadAllUserCampaigns
};
