import React from 'react';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';

const Activity = ({activity}) => {

    return (
        <Paper elevation={0}>
            <Link to={`/routines/activities/${activity.id}`}><h3>{activity.name}</h3></Link>
            <p>{activity.description}</p>
        </Paper>
    );
};

export default Activity;