import axios from 'axios';

const API = axios.create({
  // WAJIB PAKAI IP INI, JANGAN localhost
  baseURL: 'http://192.168.137.128:3001', 
});

export default API;