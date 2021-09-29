import redux_toolkit from '@reduxjs/toolkit';

import {
    loadAllCampaigns,
    loadAllUserCampaigns } from '../../web-api-thrunks';

// CommonJS Workaround

const {
    createSlice } = redux_toolkit;


// Initial State //////////////////////////////////////////////////////////////

const campaignsInitialState = {
    campaigns: [],

    isLoading: true
};


// Reducer Functions //////////////////////////////////////////////////////////

const reduceAddCampaign = (state, target) => {
    const addedCampaign = target.payload;

    var updatedCampaigns = {...state.campaigns, addedCampaign};

    var rtn = {
        ...state,
        campaigns: updatedCampaigns
    };

    return( rtn );
};

const reduceRemoveCampaign = (state, target) => {
    const { id } = target.payload;

    const filterCampaigns = state.campaigns.filter( c => c.id !== id );

    const rtn = {
        ...state,
        campaigns: filterCampaigns
    };

    return( rtn );
};

const reduceUpdateCampaign = (state, target) => {
    const {
        id,
        description,
        poolSize,
        choices } = target.payload;

    const matcher = (c) => {
        return( c.id === id );
    };

    const updateIndex = state.campaigns.findIndex(matcher);

    const original = state.campaigns[ updateIndex ];

    const updated = {
        ...original,
        description: description,
        poolSize: poolSize,
        choices: choices
    };

    var updatedCampaigns = {...state.campaigns};

    updatedCampaigns[updateIndex] = updated;

    const rtn = {
        ...state,
        campaigns: updatedCampaigns
    };

    return( rtn );
};


// Thunk Callbacks ////////////////////////////////////////////////////////////

const loadAllCampaignsSuccessful = (state, action) => {
    state.campaigns = action.payload;

    state.isLoading = false;
};

const loadAllUserCampaignsSuccessful = (state, action) => {
    state.campaigns = action.payload;

    state.isLoading = false;
};


// Slice Creation /////////////////////////////////////////////////////////////

const extraReducersBuilder = (builder) => {
    builder.addCase(
        loadAllCampaigns.fulfilled,
        loadAllCampaignsSuccessful
    );

    builder.addCase(
        loadAllUserCampaigns.fulfilled,
        loadAllUserCampaignsSuccessful
    );
};

const campaignsSlice = createSlice( {
    name: 'campaigns',

    initialState: campaignsInitialState,

    reducers: {
        campaignAdded: reduceAddCampaign,
        campaignRemoved: reduceRemoveCampaign,
        campaignUpdated: reduceUpdateCampaign
    },

    extraReducers: extraReducersBuilder
} );


// Exportation ////////////////////////////////////////////////////////////////

export const {
    campaignAdded,
    campaignRemoved,
    campaignUpdated } = campaignsSlice.actions;

export default campaignsSlice.reducer;
