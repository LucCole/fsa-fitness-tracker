// Make the description a textarea or something like that (look at strangers things)



import React, { useState } from 'react';
import { Activity } from './';
import { makeStyles } from '@material-ui/core/styles';
import { callApi } from '../api';
import { TextField, Button, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    activities: {
        width: "80vw",
        margin: "20px auto",
        "& h2":{
            textAlign: "center",
        }
    },
    header: {
        margin: "10px 0 20px 0"
    },
    menuBar: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
        "& button":{
            margin: '0 5px',
        }
    },
    form:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "& *":{
            margin: "5px 0",
            width: "300px"
        },
        "& button":{
            margin: "10px"
        }
    },
    snackbar: {
        backgroundColor: "#F44335"
    }
}))


const Activities = ({activities, setActivities, isLoggedIn, token}) => {

    const classes = useStyles();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [veiwActivities, setVeiwActivities] = useState('view');

    // Errors
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };


    const handlePageSwap = (whichPage) => {
        setVeiwActivities(whichPage);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await callApi({
            method: 'POST',
            url: 'activities',
            body: {
                name,
                description
            },
            token
        });
        
        if(typeof data === 'object'){

            // better success
            alert(name+' created');

            const fetchedActivities = await callApi({
                url: 'activities'
            });;

            setActivities(fetchedActivities);

            handlePageSwap('view');

            setName('');
            setDescription('');

            return true;
        }



        setError(data)
        handleClick();
        // better error
        // alert(data);
    };

    return (
        <div className={classes.activities}>

            <h2 className={classes.header}>Activities</h2>

            {
                isLoggedIn
                ?
                <div className={classes.menuBar}>
                    <Button variant="contained" color="primary" onClick={() => handlePageSwap('view')}>View Activities</Button>
                    <Button variant="contained" color="primary" onClick={() => handlePageSwap('create')}>Create Activity</Button>
                </div>
                :
                ''
            }

            {
                veiwActivities === 'view'
                ?
                <Grid container spacing={2}>
                    {activities.map((activity) => {
                        return(
                            <Grid item xs={6}>
                                <Activity key={'Activity_'+activity.id}  activity={activity}/>
                            </Grid>
                        );
                    })}
                </Grid>
                :
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField 
                    type="text" 
                    label="name" 
                    required
                    minLength="1"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    />

                    <TextField 
                    type="text" 
                    label="description" 
                    required
                    minLength="1"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    />

                    <Button type="submit" variant="contained" color="primary">Create</Button>
                </form>
            }

            <Snackbar
                ContentProps={{
                    classes: {
                        root: classes.snackbar
                    }
                }}
                className={classes.snackbar}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                onClose={handleClose}
                action={
                <>
                    {error}
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </>
                }
            />

        </div>
    );
};

export default Activities;