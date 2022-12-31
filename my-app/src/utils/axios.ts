import axios, { AxiosRequestConfig } from 'axios'
const instanse = axios.create({
    baseURL: 'http://localhost:3000/'
})
instanse.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers.Authorization= `Bearer ${localStorage.getItem('token')}`;
    return config
})
export default instanse