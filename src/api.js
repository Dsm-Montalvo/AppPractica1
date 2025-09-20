import axios from 'axios';


const baseURL = 'http://10.0.2.2:3000';


const api = axios.create({
  baseURL: `${baseURL}/registros`,
});

export default api;