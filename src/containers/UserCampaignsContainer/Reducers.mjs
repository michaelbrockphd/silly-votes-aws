import Actions from './Actions.mjs';

// Individual reducers for more complex actions.

const reduceAddCampaign = (state, target) => {
    var rtn = {
        ...state,
        isEditingDetails: false,
        campaignDetails: target.value,
        showCampaignDetails: true
    };

    return( rtn );
};

const reduceEditCampaign = (state, target) => {
    // Note: if a deep clone is needed, it is suggested to simply serialize and deserialize via JSON.
    //
    // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript/122704#122704

    var clone = { ...target.value };

    var rtn = {
        ...state,
        isEditingDetails: true,
        campaignDetails: clone,
        showCampaignDetails: true
    };

    return( rtn );
};

const reduceRemoveCampaignSuccess = (state, target) => {
    const modifiedCampaigns = state.campaigns.filter( c => c._id !== target.value._id );

    const rtn = {...state, campaigns: modifiedCampaigns};

    return( rtn );
};

const reduceSaveCampaignSuccess = (state, target) => {
    const campaign = target.value;

    var updatedCampaigns = [ ...state.campaigns, campaign ];

    var rtn = {
        ...state,
        campaigns: updatedCampaigns,
        showCampaignDetails: false,
        isBusy: false
    };

    return(rtn);
};

const reduceUpdateCampaignSuccess = (state, target) => {
    const campaign = target.value;

    var original = state.campaigns
                        .filter( c => c._id === campaign._id )[ 0 ];

    original.title = campaign.title;
    original.poolSize = campaign.poolSize;
    original.choices = campaign.choices;

    var rtn = {
        ...state,
        showCampaignDetails: false,
        isBusy: false
    };

    return(rtn);
};

// The main reducer.

const reducer = (state, action) => {
    switch(action.type) {
        case Actions.ADD_CAMPAIGN:
            return reduceAddCampaign(state, action);

        case Actions.CHANGE_CAMPAIGNS:
            return { ...state, campaigns: action.value };

        case Actions.CLOSE_DETAILS:
            return { ...state, showCampaignDetails: false };

        case Actions.EDIT_CAMPAIGN:
            return reduceEditCampaign(state, action);

        case Actions.INIT_FINISHED:
            return { ...state, isLoading: false, campaigns: action.value };

        case Actions.REMOVE_CAMPAIGN_FAIL:
            return { ...state, isBusy: false };

        case Actions.REMOVE_CAMPAIGN_INIT:
            return { ...state, isBusy: true };

        case Actions.REMOVE_CAMPAIGN_SUCCESS:
            return reduceRemoveCampaignSuccess(state, action);

        case Actions.SAVE_CAMPAIGN_FAIL:
            return { ...state, isBusy: false };

        case Actions.SAVE_CAMPAIGN_INIT:
            return { ...state, isBusy: true };

        case Actions.SAVE_CAMPAIGN_SUCCESS:
            return reduceSaveCampaignSuccess(state, action);

        case Actions.UPDATE_CAMPAIGN_FAIL:
            return { ...state, isBusy: false };

        case Actions.UPDATE_CAMPAIGN_INIT:
            return { ...state, isBusy: true };

        case Actions.UPDATE_CAMPAIGN_SUCCESS:
            return reduceUpdateCampaignSuccess(state, action);

        default:
            throw new Error( `${action.type} is not a recognised action.` );
    }
};

export default reducer;
