import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000',});


export const getAllPlayers = () => API.get('/');
export default API;

