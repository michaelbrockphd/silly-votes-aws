export interface ICampaignContainerState {
    isLoading: boolean;

    campaigns: Array<any>;

    showCampaignDetails: boolean;

    isEditingDetails: boolean;

    campaignDetails: any;

    isBusy: boolean;
}
