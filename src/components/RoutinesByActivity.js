import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { callApi } from '../api';
import { Routine } from './';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    routines: {
        width: "80vw",
        margin: "20px auto",
        "& h2":{
            textAlign: "center",
        }
    }
}))


const RoutinesByActivity = () => {

    const classes = useStyles();

    const [ routines, setRoutines ] = useState([]);

    const { activityId } = useParams();

    useEffect(async () => {
        const data = await callApi({
            url: `activities/${activityId}/routines`
        });

        if(typeof data === 'object'){

            setRoutines(data);
    
        }
    }, [activityId]);
    
    return (
        <div className={classes.routines}>

            <h2>Routines by activity</h2>

            {/* GO back somewhere? */}
            
            <div>
                {
                routines.length > 0
                ?
                routines.map((routine) => {
                    return <Routine key={'Public_Routine_By_Activity_'+routine.id} routine={routine} />;
                })
                :
                <>
                    <h3>There are no routines with this activity, maybe you could make the first?</h3>
                </>
                }
            </div>
        </div>
    );
};

export default RoutinesByActivity;