import { 
    Fragment, useEffect } from 'react';
import {
    useDispatch,
    useSelector } from 'react-redux'

import CampaignTable, {
    CampaignTableLoading } from '../../components/CampaignTable';

import {
    loadAllCampaigns } from '../../web-api-thrunks';

const campaignsStoreSelector = (state) => {
    return( state.campaigns );
};

const CampaignContainer = () => {
    const campaignsStore = useSelector(campaignsStoreSelector);

    const dispatch = useDispatch();

    const {
        campaigns,
        loading } = campaignsStore;

    useEffect( () => {
        dispatch(loadAllCampaigns());
    }, [loading] );
        
    return(
        <Fragment>
            {loading && 
                <CampaignTableLoading />}

            {!loading &&
                <CampaignTable campaigns={campaigns} />}
        </Fragment>
    );
};

export default CampaignContainer;
