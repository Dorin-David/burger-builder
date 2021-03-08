import axios from 'axios';

//configure axios instance and base url
const axiosInstance = axios.create({
    baseURL: 'https://react-burger-builder-7e9c0-default-rtdb.firebaseio.com/'
})

export default axiosInstance