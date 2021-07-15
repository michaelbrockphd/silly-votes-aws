import {
    Fragment,
    useEffect,
    useReducer } from 'react';
import { useAuthorization } from '../../contexts/AuthorizationContext';
import CampaignTable, { CampaignTableLoading } from '../../components/CampaignTable';
import CampaignDetailsDialog from '../../components/CampaignDetailsDialog';

import Actions from './Actions.mjs';
import reducer from './Reducers.mjs';
import WebApi from '../../web-api';

const initialState = {
    isLoading: true,
    isBusy: false,
    campaigns: [],
    showCampaignDetails: false,
    isEditingDetails: false,
    campaignDetails: null
};

const UserCampaignsContainer = (props) => {
    const [{
        isLoading,
        isBusy,
        campaigns,
        showCampaignDetails,
        isEditingDetails,
        campaignDetails }, dispatch] = useReducer(reducer, initialState);

    const { getToken } = useAuthorization();

    const token = getToken();

    useEffect(() => {
        WebApi.getUserCampaigns( token )
              .then((response) => {
                    dispatch({
                        type: Actions.INIT_FINISHED,
                        value: response.data
                    });
              })
              .catch((err) => {
                  console.log(err);
              });
    }, []);

    const addCampaign = () => {
        var fresh = {
            _id: null,
            title: '',
            poolSize: 0,
            choices: ['','']
        };

        dispatch({
            type: Actions.ADD_CAMPAIGN,
            value: fresh
        });
    };

    const editCampaign = (campaign) => {
        dispatch({
            type: Actions.EDIT_CAMPAIGN,
            value: campaign
        });
    };

    const deleteCampaign = (campaign) => {
        dispatch({ type: Actions.REMOVE_CAMPAIGN_INIT });

        WebApi.deleteUserCampaign( token, campaign )
              .then((response) => {
                  dispatch({
                      type: Actions.REMOVE_CAMPAIGN_SUCCESS,
                      value: campaign
                  });
              })
              .catch((err) => {
                  alert( "Save failed." );

                  console.log(err);

                  dispatch({ type: Actions.REMOVE_CAMPAIGN_FAIL });
              });
    };

    const closeDetails = () => {
        dispatch({ type: Actions.CLOSE_DETAILS });
    };

    const saveDetails = (data) => {
        dispatch({ type: Actions.SAVE_CAMPAIGN_INIT });

        WebApi.addUserCampaign( token, data )
              .then((response) => {
                  dispatch({
                      type: Actions.SAVE_CAMPAIGN_SUCCESS,
                      value: response.data
                  });
              })
              .catch((err) => {
                  alert( "Save failed." );

                  console.log(err);

                  dispatch({ type: Actions.SAVE_CAMPAIGN_FAIL });
              });
    };

    const updateDetails = (data) => {
        dispatch({ type: Actions.UPDATE_CAMPAIGN_INIT });

        WebApi.updateUserCampaign( token, data )
              .then((response) => {
                  dispatch({
                      type: Actions.UPDATE_CAMPAIGN_SUCCESS,
                      value: data
                  });
              })
              .catch((err) => {
                  alert( "Update failed." );

                  console.log(err);

                  dispatch({ type: Actions.UPDATE_CAMPAIGN_FAIL });
              });
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
                data={campaignDetails}
                isOpen={showCampaignDetails}
                isEditing={isEditingDetails}
                onClose={closeDetails}
                onCancel={closeDetails}
                onConfirm={isEditingDetails ? updateDetails : saveDetails} />
        </Fragment>
    );
};

export default UserCampaignsContainer;
