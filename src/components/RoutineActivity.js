import React, { useState } from 'react';
import { Paper, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { callApi } from '../api';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    activity: {
        backgroundColor: "#F7F7F7",
        margin: "10px",
        padding: "5px",
        borderTop: "1px solid lightgrey"
    },
    routActMenuBar: {
        display: "flex",
        "& button:nth-child(2)":{
            margin: "0 10px"
        },
        margin: "5px 0 10px 0"
    },
    form:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "300px",
        // alignItems: "center",
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
    open: {
        display: "initial"
    },
    closed: {
        display: "none"
    }
}))

// userData, setRoutines, setMyRoutines, setTab
const RoutineActivity = ({activity, isOwner, token, setRoutines, setMyRoutines, userData}) => {

    const classes = useStyles();

    const [isRoutActOpen, setIsRoutActOpen] = useState(false);
    const [editRoutActClass, setEditRoutActClass] = useState(classes.closed);
    const [viewRoutActClass, setViewRoutActClass] = useState(classes.open);

    const [count, setCount] = useState(activity.count);
    const [duration, setDuration] = useState(activity.duration);
    const [editCount, setEditCount] = useState(activity.count);
    const [editDuration, setEditDuration] = useState(activity.duration);

    const deleteRoutineActivity = async () => {

        alert('deleteRoutineActivity');

        const data = await callApi({
            method: 'DELETE',
            url: `routine_activities/${activity.routineActivityId}`,
            token
        });

        if(typeof data === 'object'){

            alert(data);

            
            const fetchedRoutines = await callApi({
                url: 'routines'
            });;

            const fetchedMyRoutines = await callApi({
                url: `users/${userData.username}/routines`,
                token
            });

            setRoutines(fetchedRoutines);
            setMyRoutines(fetchedMyRoutines);
            
            // ??
            // setTab('my_routines');

            return true;
        }

        alert(data);
    }

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        const data = await callApi({
            method: 'PATCH',
            url: `routine_activities/${activity.routineActivityId}`,
            body: {
                count: editCount,
                duration: editDuration
            },
            token
        });

        if(typeof data === 'object'){


            alert(data);

            setCount(editCount);
            setDuration(editDuration);

            setEditRoutActClass(classes.closed)
            setViewRoutActClass(classes.open)
            
            const fetchedRoutines = await callApi({
                url: 'routines'
            });;

            const fetchedMyRoutines = await callApi({
                url: `users/${userData.username}/routines`,
                token
            });

            setRoutines(fetchedRoutines);
            setMyRoutines(fetchedMyRoutines);

            return true;
        }

        alert(data);
    }

    return (<div className={classes.activity}>

        {
            isOwner
            ?
            <div className={classes.routActMenuBar}>
                <Button 
                variant="contained" 
                color="primary" 
                onClick={() => {
                    if(isRoutActOpen){
                        // Show routine info
                        setEditRoutActClass(classes.closed)
                        setViewRoutActClass(classes.open)
                        setIsRoutActOpen(false)
                    }else{
                        // Show routine Edit form
                        setEditRoutActClass(classes.open);
                        setViewRoutActClass(classes.closed)
                        setIsRoutActOpen(true)
                    }
                }}
                >Edit</Button>
                <Button color="secondary" onClick={() => {deleteRoutineActivity()}}>Delete</Button>

            </div>
            :
            null
        }

        <Link to={`/routines/activities/${activity.id}`}><h4>{activity.name}</h4></Link>
        <p>Description: {activity.description}</p>

        <div className={viewRoutActClass}>
            <h4>Count: {count}</h4>
            <h4>Duration: {duration}</h4>
        </div>
        {
        isOwner
        ?
        // className={classes.form}
        <div className={editRoutActClass}>
        <form onSubmit={handleEditSubmit} className={classes.form}>

            <TextField 
            type="number" 
            label="count" 
            required
            minLength="1"
            value={editCount}
            onChange={(event) => setEditCount(event.target.value)}
            />

            <TextField 
            type="number" 
            label="duration" 
            required
            minLength="1"
            value={editDuration}
            onChange={(event) => setEditDuration(event.target.value)}
            />

            <Button type="submit" variant="contained" color="primary">Save Changes</Button>

            </form>
        </div>
        :
        ''
        }
    </div>
    );
};

export default RoutineActivity;