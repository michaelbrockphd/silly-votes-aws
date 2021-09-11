import Actions from './Actions';
import { ICampaignContainerState } from './CampaignContainerState';
import { IDispatchTarget } from '../../dispatch/DispatchTarget';

// Individual reducers for more complex actions.

const reduceAddCampaign = (state: ICampaignContainerState, target: IDispatchTarget): ICampaignContainerState => {
    var rtn = {
        ...state,
        isEditingDetails: false,
        campaignDetails: target.value,
        showCampaignDetails: true
    };

    return( rtn );
};

const reduceEditCampaign = (state: ICampaignContainerState, target: IDispatchTarget): ICampaignContainerState => {
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

const reduceRemoveCampaignFail = (state: ICampaignContainerState, target: IDispatchTarget): ICampaignContainerState => {
    console.log(target.value);

    alert( "Remove failed." );
    
    var rtn = { ...state, isBusy: false }

    return rtn;
};

const reduceRemoveCampaignSuccess = (state: ICampaignContainerState, target: IDispatchTarget): ICampaignContainerState => {
    const modifiedCampaigns = state.campaigns.filter( c => c.id !== target.value.id );

    const rtn = {...state, campaigns: modifiedCampaigns};

    return( rtn );
};

const reduceSaveCampaignFail = (state: ICampaignContainerState, target: IDispatchTarget): ICampaignContainerState => {
    console.log(target.value);

    alert( "Save failed." );
    
    var rtn = { ...state, isBusy: false }

    return rtn;
};

const reduceSaveCampaignSuccess = (state: ICampaignContainerState, target: IDispatchTarget): ICampaignContainerState => {
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

const reduceUpdateCampaignSuccess = (state: ICampaignContainerState, target: IDispatchTarget): ICampaignContainerState => {
    const campaign = target.value;

    var original = state.campaigns
                        .filter( c => c.id === campaign.id )[ 0 ];

    original.description = campaign.description;
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

const reducer = (state: ICampaignContainerState, action: IDispatchTarget): ICampaignContainerState => {
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
            return reduceRemoveCampaignFail(state, action);

        case Actions.REMOVE_CAMPAIGN_INIT:
            return { ...state, isBusy: true };

        case Actions.REMOVE_CAMPAIGN_SUCCESS:
            return reduceRemoveCampaignSuccess(state, action);

        case Actions.SAVE_CAMPAIGN_FAIL:
            return reduceSaveCampaignFail(state, action);

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
