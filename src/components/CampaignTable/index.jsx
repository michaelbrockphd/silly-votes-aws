import {
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow } from '@material-ui/core';

const CampaignTableLoading = (props) => {
    return(
        <h3>Loading, please wait...</h3>
    );
};

const CampaignTableRowEmpty = (props) => {
    const {
        canModify
    } = props;

    return(
        <TableRow>
            <TableCell 
                colSpan={canModify ? 5 : 4}
                align="center">No campaigns.</TableCell>
        </TableRow>
    );
};

const CampaignTableRow = (props) => {
    const {
        campaign,
        canModify,
        editCampaign,
        deleteCampaign
    } = props;

    return(
        <TableRow key={campaign.id}>
            <TableCell component="th" scope="row">{campaign.description}</TableCell>
            <TableCell align="center">{campaign.poolSize}</TableCell>
            <TableCell align="center">{campaign.choices[0]}</TableCell>
            <TableCell align="center">{campaign.choices[1]}</TableCell>
            {canModify && <TableCell align="center">
                <Link href="#" onClick={() => editCampaign(campaign)}>Edit</Link>/<Link href="#" onClick={() => deleteCampaign(campaign)}>Delete</Link>
            </TableCell>}
        </TableRow>
    );
};

const CampaignTable = (props) => {
    const {
        canModify,
        campaigns,
        addCampaign,
        editCampaign,
        deleteCampaign
    } = props;

    const hasCampaigns = ( campaigns || [] ).length > 0;

    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Campaign Name</TableCell>
                        <TableCell align="center">Pool Size</TableCell>
                        <TableCell align="center">Choice 1</TableCell>
                        <TableCell align="center">Choice 2</TableCell>
                        {canModify && <TableCell align="center">
                            <Link href="#" onClick={addCampaign}>New Campaign...</Link>
                        </TableCell>}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {!hasCampaigns &&
                        <CampaignTableRowEmpty canModify={canModify} />}

                    {campaigns.map(c => (
                        <CampaignTableRow
                            key={c.id}
                            campaign={c}
                            canModify={canModify}
                            editCampaign={editCampaign}
                            deleteCampaign={deleteCampaign} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export { CampaignTableLoading };

export default CampaignTable;
