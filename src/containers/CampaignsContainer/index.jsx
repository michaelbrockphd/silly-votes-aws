import { Component, Fragment } from 'react';
import CampaignTable, { CampaignTableLoading } from '../../components/CampaignTable';

import WebApi from '../../web-api';

export default class CampaignContainer extends Component {
    state = {
        isLoading: true,
        campaigns: []
    };

    componentDidMount() {
        WebApi.getCampaigns()
              .then((response) => {
                    this.setState( {
                        isLoading: false,
                        campaigns: response.data
                    } );
              })
              .catch((err) => {
                  console.log(err);
              });
    }

    render() {
        const loading = this.state.isLoading;
        
        return(
            <Fragment>
                {loading && 
                    <CampaignTableLoading />}

                {!loading &&
                    <CampaignTable campaigns={this.state.campaigns} />}
            </Fragment>
        );
    }
};
