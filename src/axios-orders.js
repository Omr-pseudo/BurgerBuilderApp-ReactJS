import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger--builder-1cc60-default-rtdb.firebaseio.com/"
});

export default instance;