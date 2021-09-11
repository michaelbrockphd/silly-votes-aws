import {
    Fragment,
    useEffect,
    useReducer } from 'react';
import { useAuthorization } from '../../contexts/AuthorizationContext';
import CampaignTable, { CampaignTableLoading } from '../../components/CampaignTable';
import CampaignDetailsDialog from '../../components/CampaignDetailsDialog';

import Actions from './Actions';
import { ICampaignContainerState } from './CampaignContainerState';
import { getIdGenerator } from '../../data';
import reducer from './Reducers';
import WebApi from '../../web-api';

const initialState: ICampaignContainerState = {
    isLoading: true,
    campaigns: [],
    showCampaignDetails: false,
    isEditingDetails: false,
    campaignDetails: null,
    isBusy: false
};

const idGenerator = getIdGenerator();

const UserCampaignsContainer = (props) => {
    const [{
        isLoading,
        campaigns,
        showCampaignDetails,
        isEditingDetails,
        campaignDetails }, dispatch] = useReducer(reducer, initialState);

    const { currentUserToken } = useAuthorization();

    useEffect(() => {
        const token = currentUserToken();

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
            id: idGenerator.next().value,
            description: '',
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
        dispatch({
            type: Actions.REMOVE_CAMPAIGN_INIT,
            value: null
        });

        const token = currentUserToken();

        WebApi.deleteUserCampaign( token, campaign )
              .then((response) => {
                  dispatch({
                      type: Actions.REMOVE_CAMPAIGN_SUCCESS,
                      value: campaign
                  });
              })
              .catch((err) => {
                  dispatch({
                      type: Actions.REMOVE_CAMPAIGN_FAIL,
                      value: err
                  });
              });
    };

    const closeDetails = () => {
        dispatch({
            type: Actions.CLOSE_DETAILS,
            value: null
        });
    };

    const saveDetails = (data) => {
        dispatch({
            type: Actions.SAVE_CAMPAIGN_INIT,
            value: null
        });

        const token = currentUserToken();

        WebApi.addUserCampaign( token, data )
              .then((response) => {
                  // Let's be sneaky and pull out the new ID before passing it
                  // to the reducer.
                  data.id = response.data.newId;

                  dispatch({
                      type: Actions.SAVE_CAMPAIGN_SUCCESS,
                      value: data
                  });
              })
              .catch((err) => {
                  dispatch({
                      type: Actions.SAVE_CAMPAIGN_FAIL,
                      value: err
                  });
              });
    };

    const updateDetails = (data) => {
        dispatch({
            type: Actions.UPDATE_CAMPAIGN_INIT,
            value: null
        });

        const token = currentUserToken();

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

                  dispatch({
                      type: Actions.UPDATE_CAMPAIGN_FAIL,
                      value: null
                    });
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
