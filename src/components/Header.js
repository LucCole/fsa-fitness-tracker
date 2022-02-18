import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    toolBar: {
        display: "flex"
    },
    siteTitle: {
        flexGrow: 1,
    },
    button: {
        margin: "0 10px",
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
}))

const Header = ({isLoggedIn, setToken, setUserData, token}) => {

    const onLogOutClick = async () => {
        localStorage.removeItem('fitness-tracker-token');
        setToken('');
        setUserData({});
    };

    const classes = useStyles();

    return (
        <>
            <AppBar className={classes.appBar} position="static">
                <Toolbar className={classes.toolBar} >

                    <Typography className={classes.siteTitle} variant="h6" noWrap>
                        Fitness Tracker
                    </Typography>
                    
                    <Button variant="contained" className={classes.button}>
                        <Link className={classes.link} to="/">Home</Link>
                    </Button>

                    <Button variant="contained" className={classes.button}>
                        <Link className={classes.link} to="/routines">Routines</Link>
                    </Button>

                    <Button variant="contained" className={classes.button}>
                        <Link className={classes.link} to="/activities">Activities</Link>
                    </Button>

                    {
                    isLoggedIn 
                    ? 
                    <>
                        <Button  onClick={onLogOutClick} variant="contained" className={classes.button}>
                            <Link className={classes.link} to="/">Log Out</Link>
                        </Button>
                    </>
                    : 
                    <>
                        <Button variant="contained" className={classes.button}>
                            <Link className={classes.link} to="/login">Login</Link>
                        </Button>
                    </>
                    }
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header