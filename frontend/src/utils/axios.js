import axios from "axios";
import {
  getLocalAccessToken,
  getLocalRefreshToken,
  updateLocalAccessToken,
  updateLocalRefreshToken,
} from "./TokenService";

const instance = axios.create({
  baseURL: "http://localhost:3001/",
  // baseURL: "http://192.168.0.103:3001/",
  responseType: "json",
});

// instance.interceptors.request.use(
//   (config) => {
//     const token = getLocalAccessToken();
//     const localToken = getLocalRefreshToken();
//     if (token) {
//       config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
//       config.headers["refreshtoken"] = localToken;  // for Spring Boot back-end
//       // config.headers["x-access-token"] = token; // for Node.js Express back-end
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (res) => {
    
//     if (res.headers.token && res.headers.refreshtoken) {
//       updateLocalAccessToken(res.headers.token)
//       updateLocalRefreshToken(res.headers.refreshtoken)
//     }
//     return res;
//   },
//     (error) => {
//     return Promise.reject(error);
//   }
// );

export default instance;
