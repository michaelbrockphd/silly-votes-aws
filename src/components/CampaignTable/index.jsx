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
}

const CampaignTable = (props) => {
    const {
        canModify,
        campaigns,
        addCampaign,
        editCampaign,
        deleteCampaign
    } = props;

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
                    {campaigns.map(c => (
                        <TableRow key={c._id}>
                            <TableCell component="th" scope="row">{c.title}</TableCell>
                            <TableCell align="center">{c.poolSize}</TableCell>
                            <TableCell align="center">{c.choices[0]}</TableCell>
                            <TableCell align="center">{c.choices[1]}</TableCell>
                            {canModify && <TableCell align="center">
                                <Link href="#" onClick={() => editCampaign(c)}>Edit</Link>/<Link href="#" onClick={() => deleteCampaign(c)}>Delete</Link>
                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export { CampaignTableLoading };

export default CampaignTable;
