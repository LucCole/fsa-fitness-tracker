import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button, TextField, FormControlLabel, Checkbox, Snackbar, IconButton } from '@material-ui/core';
import { callApi } from '../api';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { RoutineActivity } from './';

const useStyles = makeStyles(theme => ({
    routine: {
        margin: "20px",
        padding: "10px"
    },
    routineHeader: {
        display: "flex",
        "& a":{
            margin: "0 10px"
        }
    },
    viewRoutine: {
        "& *":{
            margin: "10px 0"
        }
    },
    routineActivitiesMenu:{
        display: "flex",
        "& button:nth-child(2)":{
            margin: "0 10px"
        }
    },
    routineMenuBar: {
        display: "flex",
        justifyContent: "space-between"
    },
    form:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "300px",
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
    activity: {
        backgroundColor: "lightGrey",
        margin: "10px"
    },
    open: {
        display: "initial"
    },
    closed: {
        display: "none"
    },
    snackbar: {
        backgroundColor: "#F44335"
    }
}))

const Routine = ({routine, isOwner, activities, userData, setRoutines, setMyRoutines, setTab, token}) => {

    const classes = useStyles();

    const [name, setName] = useState(routine.name);
    const [goal, setGoal] = useState(routine.goal);
    const [isPublic, setIsPublic] = useState(routine.isPublic);

    // View Activities
    const [isViewActivitiesOpen, setIsViewActivitiesOpen] = useState(false);
    const [viewActivitiesClass, setViewActivitiesClass] = useState(classes.closed);

    // Add activity
    const [addActivityBtnText, setAddActivityBtnText] = useState('Add Activity');

    const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
    const [addActivityClass, setAddActivityClass] = useState(classes.closed);

    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);

    // Edit Routine
    const [editRoutineBtnText, setEditRoutineBtnText] = useState('Edit Routine');

    const [isEditRoutineOpen, setIsEditRoutineOpen] = useState(false);
    const [addEditRoutineClass, setAddEditRoutineClass] = useState(classes.closed);
    const [addViewRoutineClass, setAddViewRoutineClass] = useState(classes.open);

    const [editName, setEditName] = useState(routine.name);
    const [editGoal, setEditGoal] = useState(routine.goal);
    const [editIsPublic, setEditIsPublic] = useState(routine.isPublic);

    const [activityToAdd, setActivityToAdd] = useState(0);

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

    const routineDelete = async (routineId) => {

        const data = await callApi({
            method: 'DELETE',
            url: `routines/${routineId}`,
            token
        });

        if(typeof data === 'object'){

            const fetchedRoutines = await callApi({
                url: 'routines'
            });;

            const fetchedMyRoutines = await callApi({
                url: `users/${userData.username}/routines`,
                token
            });

            setRoutines(fetchedRoutines);
            setMyRoutines(fetchedMyRoutines);
            
            // Do I need this?
            setTab('my_routines');

            return true;
        }

        setError(data)
        handleClick();
    }

    const handleEdit = async (event) => {
        event.preventDefault();

        const data = await callApi({
            method: 'PATCH',
            url: `routines/${routine.id}`,
            body: {
                name: editName,
                goal: editGoal,
                isPublic: editIsPublic
            },
            token
        });

        if(typeof data === 'object'){

            const fetchedRoutines = await callApi({
                url: 'routines'
            });;

            const fetchedMyRoutines = await callApi({
                url: `users/${userData.username}/routines`,
                token
            });

            setName(editName);
            setGoal(editGoal);
            setIsPublic(editIsPublic);

            setAddEditRoutineClass(classes.closed)
            setAddViewRoutineClass(classes.open)
            setIsEditRoutineOpen(false)

            setRoutines(fetchedRoutines);
            setMyRoutines(fetchedMyRoutines);
            
            // // is this working?
            // setTab('my_routines');

            return true;
        }else if(data === 'duplicate key value violates unique constraint "routines_name_key"'){
            setError('There is already a routine with that name')
            handleClick();
        }

        setError(data)
        handleClick();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // does this not need a token?
        const data = await callApi({
            method: 'POST',
            url: `/routines/${routine.id}/activities`,
            body: {
                activityId: activityToAdd,
                count,
                duration
            }
        });

        if(typeof data === 'object'){

            setAddActivityClass(classes.closed)
            setIsAddActivityOpen(false)

            const fetchedRoutines = await callApi({
                url: 'routines'
            });

            const fetchedMyRoutines = await callApi({
                url: `users/${userData.username}/routines`,
                token
            });

            setRoutines(fetchedRoutines);
            setMyRoutines(fetchedMyRoutines);

            // if not re-freshing then put this back in
            // setTab('my_routines');

            return true;
        }

        // make popo up here

        setError(data)
        handleClick();
    };


    return (
        <Paper variant="outlined" square className={classes.routine}>

            {/* {
                isOwner
                ?
                <>
                    <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => {
                        if(isEditRoutineOpen){
                            // Show routine info
                            setAddEditRoutineClass(classes.closed)
                            setAddViewRoutineClass(classes.open)
                            setIsEditRoutineOpen(false)
                        }else{
                            // Show routine Edit form
                            setAddEditRoutineClass(classes.open);
                            setAddViewRoutineClass(classes.closed)
                            setIsEditRoutineOpen(true)
                        }
                    }}
                    >Edit Routine</Button>
                    <Button variant="contained" color="secondary" onClick={() => routineDelete(routine.id)}>Delete</Button>
                </>
                :
                ''
            } */}
{/* 
            <div>
 */}

                {
                    isOwner
                    ?
                    <div className={classes.routineMenuBar}>
                        <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => {
                            if(isEditRoutineOpen){
                                // Show routine info
                                setAddEditRoutineClass(classes.closed)
                                setAddViewRoutineClass(classes.open)
                                setIsEditRoutineOpen(false)
                                setEditRoutineBtnText('Edit Routine');
                            }else{
                                // Show routine Edit form
                                setAddEditRoutineClass(classes.open);
                                setAddViewRoutineClass(classes.closed)
                                setIsEditRoutineOpen(true)
                                setEditRoutineBtnText('Cancel Edit');
                            }
                        }}

                        //  ---------------------------------------------------------------------------------------
                        >{editRoutineBtnText}</Button>
                        <Button color="secondary" onClick={() => routineDelete(routine.id)}>Delete</Button>
                    </div>
                    :
                    ''
                }

                <div className={`${addViewRoutineClass} ${classes.viewRoutine}`}>
                    

                    <div className={classes.routineHeader}>
                        <h3>{name} <small>-</small></h3>
                        <Link to={`/routines/user/${routine.creatorName}`}><h3>{routine.creatorName}</h3></Link>
                    </div>
                    <h3>Goal: {goal}</h3>
                </div>

            <div className={addEditRoutineClass}>
                <form onSubmit={handleEdit} className={classes.form}>

                    <TextField 
                    type="text" 
                    label="name" 
                    required
                    minLength="1"
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                    />
        
                    <TextField 
                    type="text" 
                    label="goal" 
                    required
                    minLength="1"
                    value={editGoal}
                    onChange={(event) => setEditGoal(event.target.value)}
                    /> 

                    <FormControlLabel
                    control={
                        <Checkbox 
                        checked={editIsPublic} 
                        color="primary"
                        name="delivery" 
                        value={editIsPublic}
                        onChange={(event) => setEditIsPublic(event.target.checked)} 
                        />
                    }
                    label="Public Routine"
                    />

                    <Button type="submit" variant="contained" color="primary">Save Changes</Button>
                </form>
            </div>

            <div className={classes.routineActivitiesMenu}>
                    {
                        routine.activities.length > 0
                        ?
                        <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => {
                            if(isViewActivitiesOpen){
                                setViewActivitiesClass(classes.closed)
                                setIsViewActivitiesOpen(false)
                            }else{
                                setViewActivitiesClass(classes.open);
                                setIsViewActivitiesOpen(true)
                            }
                        }}
                        >View Activities</Button>
                        :
                        null
                    }

                    {
                        isOwner
                        ?
                        <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => {
                            if(isAddActivityOpen){
                                setAddActivityClass(classes.closed)
                                setIsAddActivityOpen(false)
                                setAddActivityBtnText('Add Activity');
                            }else{
                                setAddActivityClass(classes.open);
                                setIsAddActivityOpen(true)
                                setAddActivityBtnText('Cancel Adding');
                            }
                        }}
                        >{addActivityBtnText}</Button>
                        :
                        ''
                    }

            </div>

            <div className={addActivityClass}>

            {
                isOwner
                ?
                <form className={classes.form} onSubmit={handleSubmit}>
                    Choose activity 
                    <select value={activityToAdd} onChange={(event) => setActivityToAdd(event.target.value)}>
                        <option value="0">None</option>
                        {
                        activities.map((activity) => {
                            return <option key={'Routine_'+routine.id+'_Option'+activity.id} value={activity.id}>{activity.name}</option>
                        })
                        }
                    </select>

                    <TextField 
                    type="number" 
                    label="count" 
                    required
                    minLength="1"
                    value={count}
                    onChange={(event) => setCount(event.target.value)}
                    />
        
                    <TextField 
                    type="number" 
                    label="duration" 
                    required
                    minLength="1"
                    value={duration}
                    onChange={(event) => setDuration(event.target.value)}
                    />

                    <Button type="submit" variant="contained" color="primary">Create</Button>

                </form>
                :
                null
            }
            </div>

            <div className={viewActivitiesClass}>

            {
                routine.activities.map((activity) => {
                    return (
                    <RoutineActivity 
                    key={'Routine_Activity_'+activity.routineActivityId}
                    activity={activity} 
                    isOwner={isOwner} 
                    token={token} 
                    setRoutines={setRoutines} 
                    setMyRoutines={setMyRoutines} 
                    userData={userData}
                    />
                    );
                })
            }
            </div>

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
        </Paper>
    );
};

export default Routine;