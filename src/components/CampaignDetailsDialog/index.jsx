import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField } from '@material-ui/core';

const CampaignDetailsDialog = (props) => {
    const {
        data,
        isOpen,
        isEditing,
        onConfirm,
        onCancel,
        onClose
    } = props;

    // TODO: Maybe give this dialog its own reducer?

    const [title, setTitle] = useState();
    const [poolSize, setPoolSize] = useState();
    const [choice1, setChoice1] = useState();
    const [choice2, setChoice2] = useState();

    useEffect(() => {
        if(data) {
            setTitle(data.title);
            setPoolSize(data.poolSize);
            setChoice1(data.choices[0]);
            setChoice2(data.choices[1]);
        }
    }, [data]);

    const changedTitle = (event) => {
        const { value } = event.target;

        setTitle(value);
    };

    const changedPoolSize = (event) => {
        const { value } = event.target;

        setPoolSize(value);
    };

    const changedChoice1 = (event) => {
        const { value } = event.target;

        setChoice1(value);
    };

    const changedChoice2 = (event) => {
        const { value } = event.target;

        setChoice2(value);
    };

    const freshData = () => {
        var rtn = {
            ...data,
            title: title,
            poolSize: poolSize,
            choices: [choice1, choice2]
        };

        return(rtn);
    };

    return(
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{isEditing ? 'Edit Campaign' : 'New Campaign'}</DialogTitle>

            <DialogContent>
                {data && <Grid container direction="column" spacing={2}>
                    <TextField
                        label="Campaign Title"
                        value={title}
                        onChange={changedTitle} />
                    <TextField
                        label="Pool Size"
                        value={poolSize}
                        onChange={changedPoolSize} />
                    <TextField
                        label="Choice 1"
                        value={choice1}
                        onChange={changedChoice1} />
                    <TextField
                        label="Choice 2"
                        value={choice2}
                        onChange={changedChoice2} />
                </Grid>}
            </DialogContent>
            
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={(e) => onConfirm(freshData())}>{isEditing ? 'Save' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CampaignDetailsDialog;
