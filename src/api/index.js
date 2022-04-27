
// ----- WARNING! commented this out !WARNING -----

// export const BASE_URL = 'https://strangers-things.herokuapp.com/api/';
// export const COHORT_NAME = '2104-ECE-RM-WEB-PT/';
// export const API_URL = BASE_URL + COHORT_NAME;

export const API_URL = 'http://localhost:3001/api/';

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
