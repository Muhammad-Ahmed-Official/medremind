import axios from 'axios'

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "https://medremind-ten.vercel.app/api/v1/";
const api = axios.create({ baseURL: API_URL, timeout: 10000 });

export default api;