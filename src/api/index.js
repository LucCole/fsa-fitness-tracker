
// ----- WARNING! commented this out !WARNING -----

// export const BASE_URL = 'https://strangers-things.herokuapp.com/api/';
// export const COHORT_NAME = '2104-ECE-RM-WEB-PT/';
// export const API_URL = BASE_URL + COHORT_NAME;

export const API_URL = 'https://intense-ravine-03690.herokuapp.com/api/';

export const callApi = async ({ url, method, token, body }) => {
  
    try {
        const options = {
            method: method ? method.toUpperCase() : 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(API_URL + url, options);
        const data = await response.json();

        if (data.error) {
            throw data.error;
        }

        return data;
    } catch (error) {
        return error;
    }
};



// ----- WARNING! commented this out !WARNING -----

// export const fetchUserData = async (token) => {
//     const { data } = await callApi({
//         url: '/users/me',
//         token,
//     });

//     return data;
// };

// export const fetchPosts = async (token) => {
//     const {
//         data: { posts },
//     } = await callApi({
//         url: '/posts',
//         token,
//     });

//     return posts;
// };















// ----- WARNING! commented this out !WARNING -----


// export const FT_API_URL = 'http://localhost:3001/api/';

// export const ftCallApi = async ({ url, method, token, body }) => {
  
//     try {
//         const options = {
//             method: method ? method.toUpperCase() : 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(body),
//         };

//         if (token) {
//             options.headers['Authorization'] = `Bearer ${token}`;
//         }

//         const response = await fetch(FT_API_URL + url, options);
//         const data = await response.json();

//         if (data.error) {
//             throw data.error;
//         }

//         return data;
//     } catch (error) {
//         return error;
//     }
// };

// // Users
// export const register = async (username, password) => {
//     const data = await callApi({
//         method: 'POST',
//         url: 'users/register',
//         body: {username, password}
//     });
//     return data;
// };

// export const login = async (username, password) => {
//     const data = await callApi({
//         method: 'POST',
//         url: 'users/login',
//         body: {username, password}
//     });
//     return data;
// };

// // TODO
// export const getRoutinesByUsername = async (username) => {
//     const data = await callApi({
//         url: `users/${username}/routines`
//     });
//     return data;
// };

// export const getMe = async (token) => {
//     const data = await callApi({
//         url: 'users/me',
//         token
//     });
//     return data;
// };

// // Routines
// export const createRoutine = async ({isPublic, name, goal, token}) => {
//     const data = await callApi({
//         method: 'POST',
//         url: 'routines',
//         body: {isPublic, name, goal},
//         token
//     });
//     return data;
// };

// export const updateRoutine = async ({routineId, isPublic, name, goal, token})  => {
//     const data = await callApi({
//         method: 'PATCH',
//         url: `routines/${routineId}`,
//         body: {isPublic, name, goal},
//         token
//     });
//     return data;
// };

// export const deleteRoutine = async (routineId, token) => {
//     const data = await callApi({
//         method: 'DELETE',
//         url: `routines/${routineId}`,
//         token
//     });
//     return data;
// };

// export const addActivityToRoutine = async ({routineId, activityId, count, duration}) => {
//     const data = await callApi({
//         method: 'POST',
//         url: `/routines/${routineId}/activities`,
//         body: {
//             activityId,
//             count,
//             duration
//         }
//     });
//     return data;
// };

// export const getAllRoutines = async () => {
//     const data = await callApi({
//         url: 'routines'
//     });
//     return data;
// };

// // Activities
// export const createActivity = async ({name, description, token}) => {
//     const data = await callApi({
//         method: 'POST',
//         url: 'activities',
//         body: {
//             name,
//             description
//         },
//         token
//     });
//     return data;
// };

// export const updateActivity = async ({activityId, name, description, token}) => {
//     const data = await callApi({
//         method: 'PATCH',
//         url: `activities/${activityId}`,
//         body: {
//             name, 
//             description
//         },
//         token
//     });
//     return data;
// };

// export const getAllActivities = async () => {
//     const data = await callApi({
//         url: 'activities'
//     });
//     return data;
// };

// export const getPublicRoutinesByActivity = async (activityId) => {
//     const data = await callApi({
//         url: `activities/${activityId}/routines`
//     });
//     return data;
// };

// // Routine Activities
// export const updateRoutineActivity = async ({routineActivityId, count, duration, token}) => {
//     const data = await callApi({
//         method: 'PATCH',
//         url: `routine_activities/${routineActivityId}`,
//         body: {
//             count,
//             duration
//         },
//         token
//     });
//     return data;
// };

// export const deleteRoutineActivity = async (routineActivityId, token) => {
//     const data = await callApi({
//         method: 'DELETE',
//         url: `routine_activities/${routineActivityId}`,
//         token
//     });
//     return data;
// };






// // create routine
//         // const data = await createRoutine({
//         //     isPublic: false, 
//         //     name: '2 name', 
//         //     goal: '2 goal', 
//         //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJMdWMiLCJpYXQiOjE2MzI1MjE5MDUsImV4cCI6MTYzMzEyNjcwNX0.rNAWjXk579GBBVu7QjbEa1ylWbvzU8ByCvwtJgB5WGc'
//         // });

//         // update routine
//         // const data = await updateRoutine({
//         //     routineId: 7, 
//         //     isPublic: false, 
//         //     name: 'First routine update!!', 
//         //     goal: 'work out even MORE dude!', 
//         //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJMdWMiLCJpYXQiOjE2MzI1MjE5MDUsImV4cCI6MTYzMzEyNjcwNX0.rNAWjXk579GBBVu7QjbEa1ylWbvzU8ByCvwtJgB5WGc'
//         // });

//         // delete routine
//         //const data = await deleteRoutine(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJMdWMiLCJpYXQiOjE2MzI1MjE5MDUsImV4cCI6MTYzMzEyNjcwNX0.rNAWjXk579GBBVu7QjbEa1ylWbvzU8ByCvwtJgB5WGc');

//         // add activity to routine
//         // const data = await addActivityToRoutine({
//         //     routineId: 6, 
//         //     activityId: 1, 
//         //     count: 20, 
//         //     duration: 30
//         // });

//         // get all routines
//         // const data = await getAllRoutines();

//         // get all acitivties
//         // const data = await getAllActivities();

//         // get public routines by activity
//         //const data = await getPublicRoutinesByActivity(100);

//         // create activity
//         // const data = await createActivity({name: 'Lucs test', description: 'this is a test activity', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJMdWMiLCJpYXQiOjE2MzI1MjE5MDUsImV4cCI6MTYzMzEyNjcwNX0.rNAWjXk579GBBVu7QjbEa1ylWbvzU8ByCvwtJgB5WGc'});
        
//         // update activity
//         //const data = await updateActivity({activityId: 9, name: '9 update', description: 'this is a test update for an activity', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJMdWMiLCJpYXQiOjE2MzI1MjE5MDUsImV4cCI6MTYzMzEyNjcwNX0.rNAWjXk579GBBVu7QjbEa1ylWbvzU8ByCvwtJgB5WGc'});
        


//         // delete routine activity
//         // const data = await deleteRoutineActivity(
//         //     13, 
//         //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJMdWMiLCJpYXQiOjE2MzI1MjE5MDUsImV4cCI6MTYzMzEyNjcwNX0.rNAWjXk579GBBVu7QjbEa1ylWbvzU8ByCvwtJgB5WGc'
//         // );
        
//         /* BROKEN*/
//         //data = await getRoutinesByUsername('Luc');
        
//         // console.log('data: ', data);