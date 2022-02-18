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


const RoutinesByUser = () => {

    const classes = useStyles();

    const [ routines, setRoutines ] = useState([]);

    const { username } = useParams();

    useEffect(async () => {
        const data = await callApi({
            url: `users/${username}/routines`
        });

        if(typeof data === 'object'){

            setRoutines(data);
        }

    }, [username]);
    
    return (
        <div className={classes.routines}>

            <h2>Routines by user</h2>

            {/* GO back somewhere? */}
            
            <div>
                {
                routines?.map((routine) => {
                    return <Routine key={'Public_Routine_By_User_'+routine.id} routine={routine} />;
                })
                }
            </div>
        </div>
    );
};

export default RoutinesByUser;