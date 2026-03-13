import axios from 'axios'
import { Platform } from 'react-native'

// android: "http://192.168.0.106:3000/api/v1",
// ios: "http://192.168.0.106:3000/api/v1/",

const LOCAL_API_URL = Platform.select({
    android: "http://s4cee4u-amahmed-8081.exp.direct:3000/api/v1",
    ios: "http://s4cee4u-amahmed-8081.exp.direct:3000/api/v1/",
    default: "http://localhost:3000/api/v1/"
});

const api = axios.create({ baseURL: LOCAL_API_URL, timeout: 10000, })
export default api;