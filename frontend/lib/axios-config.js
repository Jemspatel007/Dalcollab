import axios from 'axios';

const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
};

let r = null;

const request = () => {
    if (!r && typeof window !== 'undefined') {
        const baseURL = `http://${window.location.hostname}:8080/api/v1/`;
        r = axios.create({ baseURL });

        r.interceptors.request.use(
            (config) => {
                const token = getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
    return r;
};

export default request;
