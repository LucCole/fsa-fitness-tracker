import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    homePage: {
        marginTop: "10vh",
        textAlign: "center",
        "& > *": {
            margin: "20px 0"
        }
    }
}))

const Home = ({activity}) => {

    const classes = useStyles();


    return (
        <div className={classes.homePage}>
            <h1>Fitness Tracker</h1>

            <ul>
                <li><span className={classes.bullet}>*</span> Create Activities</li>
                <li><span className={classes.bullet}>*</span> Build Routines</li>
                <li><span className={classes.bullet}>*</span> View Others Routines</li>
            </ul>

            <h2>Enjoy!</h2>

        </div>
    );
};

export default Home;