import redux_toolkit from '@reduxjs/toolkit'

import webApi from '../web-api'

// CommonJS Workaround

const {
    createAsyncThunk } = redux_toolkit;



// Thunk Implementations //////////////////////////////////////////////////////


const STORE_NAME = "campaigns";

const loadAllCampaigns = createAsyncThunk(
    `${STORE_NAME}/loadAllCampaigns`,
    async () => {
        const response = await webApi.getCampaigns();

        return response.data;
    }
);

const loadAllUserCampaigns = createAsyncThunk(
    `${STORE_NAME}/loadAllCampaigns`,
    async (token) => {
        const response = await webApi.getUserCampaigns();

        return response.data;
    }
);

// Exportation ////////////////////////////////////////////////////////////////

export {
    loadAllCampaigns,
    loadAllUserCampaigns
};
