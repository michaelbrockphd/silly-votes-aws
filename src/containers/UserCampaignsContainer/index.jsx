import {
    Fragment,
    useEffect,
    useReducer } from 'react';
import {
    useDispatch,
    useSelector } from 'react-redux'


import ContainerActions from './Actions.mjs';
import containerReducer from './Reducers.mjs';
import CampaignTable, {
    CampaignTableLoading } from '../../components/CampaignTable';
import CampaignDetailsDialog from '../../components/CampaignDetailsDialog';
import {
    useAuthorization } from '../../contexts/AuthorizationContext';
import {
    getIdGenerator } from '../../data';
import {
    addUserCampaign,
    deleteUserCampaign,
    loadAllUserCampaigns,
    updateUserCampaign } from '../../web-api-thrunks';


const idGenerator = getIdGenerator();

const initialState = {
    isEditingDetails: false,
    selectedCampaignDetails: null,
    showCampaignDetails: false
};

const campaignsStoreSelector = (state) => {
    return( state.campaigns );
};

const UserCampaignsContainer = (props) => {
    const [{
        isEditingDetails,
        selectedCampaignDetails,
        showCampaignDetails }, containerDispatch] = useReducer(containerReducer, initialState);

    const { currentUserToken } = useAuthorization();

    const campaignsStore = useSelector(campaignsStoreSelector);

    const {
        campaigns,
        isLoading } = campaignsStore;

    const storeDispatch = useDispatch();

    useEffect(() => {
        const token = currentUserToken();

        storeDispatch(loadAllUserCampaigns(token));
    }, [isLoading]);

    const addCampaign = () => {
        var fresh = {
            id: idGenerator.next().value,
            description: '',
            poolSize: 0,
            choices: ['','']
        };

        containerDispatch({
            type: ContainerActions.ADD_CAMPAIGN,
            value: fresh
        });
    };

    const closeDetails = () => {
        containerDispatch({ type: ContainerActions.CLOSE_DETAILS });
    };

    const deleteCampaign = (campaign) => {
        const token = currentUserToken();

        storeDispatch(deleteUserCampaign( { token, campaign } ))
            .then( () => {
                containerDispatch({ type: ContainerActions.CLOSE_DETAILS });
            } )
            .catch( (err) => {
                containerDispatch({
                    type: ContainerActions.REMOVE_CAMPAIGN_FAIL,
                    value: err
                });
            } );
    };

    const editCampaign = (campaign) => {
        containerDispatch({
            type: ContainerActions.EDIT_CAMPAIGN,
            value: campaign
        });
    };

    const addDetails = (campaign) => {
        const token = currentUserToken();

        storeDispatch(addUserCampaign( { token, campaign } ))
            .then( () => {
                containerDispatch({ type: ContainerActions.CLOSE_DETAILS });
            } )
            .catch( (err) => {
                containerDispatch({
                    type: ContainerActions.SAVE_CAMPAIGN_FAIL,
                    value: err
                });
            } );
    };

    const updateDetails = (campaign) => {
        const token = currentUserToken();

        storeDispatch(updateUserCampaign({token, campaign}))
            .then( () => {
                containerDispatch({ type: ContainerActions.CLOSE_DETAILS });
            } )
            .catch( (err) => {
                containerDispatch({
                    type: ContainerActions.UPDATE_CAMPAIGN_FAIL,
                    value: err
                });
            } );
    };

    return(
        <Fragment>
            {isLoading && 
                <CampaignTableLoading />}

            {!isLoading &&
                <CampaignTable
                    campaigns={campaigns}
                    canModify={true}
                    addCampaign={addCampaign}
                    editCampaign={editCampaign}
                    deleteCampaign={deleteCampaign} />}

            <CampaignDetailsDialog
                data={selectedCampaignDetails}
                isOpen={showCampaignDetails}
                isEditing={isEditingDetails}
                onClose={closeDetails}
                onCancel={closeDetails}
                onConfirm={isEditingDetails ? updateDetails : addDetails} />
        </Fragment>
    );
};

export default UserCampaignsContainer;
