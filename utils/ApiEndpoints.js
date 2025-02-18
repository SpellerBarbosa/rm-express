export const apiEndPoints ={
    BASE_URL: 'http://localhost:3001',
    SECURE: '/api/secure',
    LOGIN: '/api/login',
    SIGNUP: '/api/signup',
    REQUEST: '/api/request',
    REQUESTS: '/api/requests',
}

export const getApiUrl = (endpoint) =>{
    return `${apiEndPoints.BASE_URL}${endpoint}`;
};