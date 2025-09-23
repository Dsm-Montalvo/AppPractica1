import axios from 'axios';


const baseURL = 'https://api-app-1el0.onrender.com'; 

const api = axios.create({
  baseURL: `${baseURL}/registros`,
});

export default api;