import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { callApi } from '../api';
import { AccountForm, Routines, Activities, RoutinesByActivity, RoutinesByUser, Home } from './';
import Header from './Header';

const App = () => {

  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});
  const [myRoutines, setMyRoutines] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);

  const isLoggedIn = userData.username !== undefined;

  useEffect(async () => {

    if(routines.length === 0) {
      const fetchedRoutines = await callApi({
        url: 'routines'
      });;

      setRoutines(fetchedRoutines);
    }

    if(activities.length === 0) {
      const fetchedActivities = await callApi({
        url: 'activities'
      });;

      setActivities(fetchedActivities);
    }

    if(myRoutines.length === 0) {

      if(userData.username !== undefined){
        const fetchedMyRoutines = await callApi({
          url: `users/${userData.username}/routines`,
          token
        });
        setMyRoutines(fetchedMyRoutines);
      }
    }
  });

  useEffect(async () => {

    if (!token) {
      setToken(localStorage.getItem('fitness-tracker-token'));
      return;
    }

    const data = await callApi({
      url: 'users/me',
      token
    });

    setUserData(data);

  }, [token]);

  return (
    <>
      <Header 
      isLoggedIn={isLoggedIn} 
      setUserData={setUserData} 
      setToken={setToken} 
      token={token} 
      />
      
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <AccountForm action="register" setToken={setToken}/>
        </Route>
        <Route path="/login">
          <AccountForm action="login" setToken={setToken}/>
        </Route>

        <Route exact path="/routines">
          <Routines 
          routines={routines} 
          setRoutines={setRoutines} 
          myRoutines={myRoutines} 
          setMyRoutines={setMyRoutines} 
          activities={activities} 
          isLoggedIn={isLoggedIn} 
          token={token}
          userData={userData}
          />
        </Route>

        <Route exact path="/activities">
          <Activities activities={activities} setActivities={setActivities} isLoggedIn={isLoggedIn} token={token}/>
        </Route>

        <Route path="/routines/activities/:activityId">
          <RoutinesByActivity/>
        </Route>

        <Route path="/routines/user/:username">
          <RoutinesByUser/>
        </Route>

      </Switch>
    </>
  );
};

export default App;