import Actions from './Actions.mjs';


// Individual reducers ////////////////////////////////////////////////////////

const reduceAddCampaign = (state, target) => {
    const rtn = {
        ...state,
        isEditingDetails: false,
        selectedCampaignDetails: target.value,
        showCampaignDetails: true
    };

    return( rtn );
};

const reduceCloseDetails = (state, target) => {
    const rtn = {
        ...state,
        selectedCampaignDetails: null,
        showCampaignDetails: false
    };

    return( rtn );
};

const reduceEditCampaign = (state, target) => {
    // Note: if a deep clone is needed, it is suggested to simply serialize and deserialize via JSON.
    //
    // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript/122704#122704

    const clone = { ...target.value };

    const rtn = {
        ...state,
        isEditingDetails: true,
        selectedCampaignDetails: clone,
        showCampaignDetails: true
    };

    return( rtn );
};

const reduceRemoveCampaignFail = (state, error) => {
    console.log(error);

    alert( "Remove failed." );
    
    const rtn = { ...state, isBusy: false }

    return rtn;
};

const reduceRemoveCampaignSuccess = (state, target) => {
    const modifiedCampaigns = state.campaigns.filter( c => c.id !== target.value.id );

    const rtn = {...state, campaigns: modifiedCampaigns};

    return( rtn );
};

const reduceSaveCampaignFail = (state, error) => {
    console.log(error);

    alert( "Save failed." );
    
    const rtn = { ...state }

    return rtn;
};


// Main Reducer ///////////////////////////////////////////////////////////////

const reducer = (state, action) => {
    switch(action.type) {
        case Actions.ADD_CAMPAIGN:
            return reduceAddCampaign(state, action);

        case Actions.CLOSE_DETAILS:
            return reduceCloseDetails(state, action);

        case Actions.EDIT_CAMPAIGN:
            return reduceEditCampaign(state, action);

        case Actions.REMOVE_CAMPAIGN_FAIL:
            return reduceRemoveCampaignFail(state, action);

        case Actions.SAVE_CAMPAIGN_FAIL:
            return reduceSaveCampaignFail(state, action);

        case Actions.UPDATE_CAMPAIGN_FAIL:
            return { ...state };

        default:
            throw new Error( `${action.type} is not a recognised action.` );
    }
};


// Exportation ////////////////////////////////////////////////////////////////

export default reducer;
