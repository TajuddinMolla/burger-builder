import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://burger-builder-1b1eb-default-rtdb.firebaseio.com/'
});

export default instance;