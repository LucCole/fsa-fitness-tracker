import React, { useState } from 'react';
import { Routine } from './';
import { Button, TextField, Checkbox, FormControlLabel, Snackbar, IconButton } from '@material-ui/core';
import { callApi } from '../api';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    routines: {
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
        "& label":{
            margin: "5px 0",
        },
        "& input":{
            margin: "5px 0",
            width: "300px"
        },
        "& button":{
            margin: "10px 0",
            width: "300px"
        }
    },
    snackbar: {
        backgroundColor: "#F44335"
    }
}))

const Routines = ({routines, setRoutines, myRoutines, setMyRoutines, activities, isLoggedIn, token, userData}) => {
    
    const classes = useStyles();

    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [tab, setTab] = useState('all_routines');

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await callApi({
            method: 'POST',
            url: 'routines',
            body: {isPublic, name, goal},
            token
        });

        if(typeof data === 'object'){

            alert(name+' created');

            const fetchedRoutines = await callApi({
                url: 'routines'
            });;

            const fetchedMyRoutines = await callApi({
                url: `users/${userData.username}/routines`,
                token
            });

            setRoutines(fetchedRoutines);
            setMyRoutines(fetchedMyRoutines);

            setTab('my_routines');

            setName('');
            setGoal('');
            setIsPublic(false);

            return true;
        }else if(data === 'duplicate key value violates unique constraint "routines_name_key"'){ 
            // not showing
            setError('There is already a routine with that name')
            handleClick();
        }

        setError(data)
        handleClick();
    };

    return (
        <div className={classes.routines}>

            <h2 className={classes.header}>Routines</h2>

            {
                isLoggedIn
                ?
                <div className={classes.menuBar}>
                    <Button variant="contained" color="primary" onClick={() => setTab('all_routines')}>All Routines</Button>
                    <Button variant="contained" color="primary" onClick={() => setTab('my_routines')}>My Routines</Button>
                    <Button variant="contained" color="primary" onClick={() => setTab('create_routines')}>Create Routine</Button>
                </div>
                :
                ''
            }

            {
            tab === 'all_routines'
            ?
            <div>
                {

                typeof routines === 'object'
                ?
                routines.map((routine) => {
                    return (
                        <>
                            <Routine 
                            key={'Public_Routine_'+routine.id}
                            routine={routine} 
                            />
                        </>
                    );
                })
                :
                'There are no routines yet....'
                    
                }
            </div>
            :
            ''  

            }

            {

            tab === 'my_routines'
            ?
            <div>
                {
                    typeof myRoutines === 'object'
                    ?
                    myRoutines.map((myRoutine) => {

                        return (
                            <>
                                <Routine 
                                key={'My_Routine_'+myRoutine.id}
                                routine={myRoutine} 
                                isOwner={true} 
                                activities={activities} 
                                setRoutines={setRoutines} 
                                setMyRoutines={setMyRoutines}
                                userData={userData}
                                setTab={setTab}
                                token={token}
                                />
                            </>
                        );
                    })
                    :
                    "You haven't made any routines yet, time to make some!"
                }
            </div>
            :
            ''
            }

            {
            tab === 'create_routines'
            ?
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField 
                type="text" 
                label="Name" 
                required
                minLength="1"
                value={name}
                onChange={(event) => setName(event.target.value)}
                />
    
                <TextField 
                type="text" 
                label="Goal" 
                required
                minLength="1"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                />

                <div>
                    <FormControlLabel
                    control={
                        <Checkbox 
                        checked={isPublic} 
                        color="primary"
                        name="Public" 
                        value={isPublic}
                        onChange={(event) => setIsPublic(event.target.checked)} 
                        />
                    }
                    label="Public Routine"
                    />
                </div>
                
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
            :
            ''
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

export default Routines;