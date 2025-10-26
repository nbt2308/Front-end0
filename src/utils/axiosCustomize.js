// import axios from 'axios';
// import NProgress from 'nprogress';
// import { store } from '../redux/store';
// import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../redux/reducer/userReducer';
// import { postRefreshToken } from '../services/apiService';

// // ===== Queue cho các request chờ refresh =====
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// const instance = axios.create({
//   baseURL: 'http://localhost:8000',

// });



// // Add a request interceptor
// instance.interceptors.request.use(function (config) {
//   const access_token = store?.getState()?.account?.access_token
//   config.headers["Authorization"] = `Bearer ${access_token}`;
//   NProgress.start();
//   // Do something before request is sent
//   return config;
// }, function (error) {
//   NProgress.start();
//   // Do something with request error
//   return Promise.reject(error);
// });

// // Add a response interceptor
// instance.interceptors.response.use(function (response) {
//   NProgress.done();
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   return response && response.data ? response.data : response;
// }, async function (error) {
//   NProgress.done();
//   //token expired( res.EC=-999) 
//   const originalRequest = error.config;
//   if (
//     error.response &&
//     // error.response.status === 401 &&
//     error.response.data?.EC === -999 &&
//     !originalRequest._retry
//   ) {
//     // đánh dấu để tránh loop vô hạn
//     originalRequest._retry = true;

//     if (isRefreshing) {
//       // request khác đang refresh -> đẩy vào queue
//       return new Promise((resolve, reject) => {
//         failedQueue.push({ resolve, reject });
//       })
//         .then((token) => {
//           originalRequest.headers["Authorization"] = "Bearer " + token;
//           return instance(originalRequest);
//         })
//         .catch((err) => Promise.reject(err));
//     }
//     isRefreshing = true;
//     const refresh_token = store?.getState()?.account?.refresh_token;
//     const email = store?.getState()?.account?.email;
//     try {
//       const res = await postRefreshToken(email, refresh_token);

//       const newAccessToken = res?.data?.DT?.access_token;
//       const newRefreshToken = res?.data?.DT?.refresh_token;

//       // cập nhật Redux
//       store.dispatch(
//         FETCH_USER_LOGIN_SUCCESS({
//           access_token: newAccessToken,
//           refresh_token: newRefreshToken,
//         })
//       );

//       processQueue(null, newAccessToken);

//       // retry request cũ với token mới
//       originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
//       return instance(originalRequest);
//     } catch (err) {
//       processQueue(err, null);
//       store.dispatch(USER_LOGOUT_SUCCESS());
//       window.location.href = "/login";
//       return Promise.reject(err);
//     } finally {
//       isRefreshing = false;
//     }
//   }
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
// });
// export default instance;

import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:8000/',

});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {

  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response && response.data ? response.data : response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
export default instance;
