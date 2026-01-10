import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";
import {
  FETCH_USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS
} from "../redux/reducer/userReducer";
import { postRefreshToken } from "../services/apiService";
import { toast } from "react-toastify";

/* =====================
   Refresh Token Queue
===================== */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

/* =====================
   Axios Instance
===================== */
const instance = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true
});

/* =====================
   Request Interceptor
===================== */
instance.interceptors.request.use(
  (config) => {
    const accessToken = store?.getState()?.account?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    NProgress.start();
    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

/* =====================
   Response Interceptor
===================== */
instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response?.data ?? response;
  },
  async (error) => {
    NProgress.done();

    const originalRequest = error.config;
    const status = error.response?.status;

    /* =====================
       ACCESS TOKEN EXPIRED
    ===================== */
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return instance(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = store?.getState()?.account?.refreshToken;

        const res = await postRefreshToken(refreshToken);

        const newAccessToken = res?.DT?.accessToken;
        const newRefreshToken = res?.DT?.refreshToken;

        store.dispatch(
          FETCH_USER_LOGIN_SUCCESS({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
          })
        );

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        store.dispatch(USER_LOGOUT_SUCCESS());
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    /* =====================
       OTHER HTTP ERRORS
    ===================== */
    switch (status) {
      case 403:
        toast.error("You don't have permission to access this resource");
        break;
      case 404:
        toast.error("Resource not found");
        break;
      case 409:
        toast.error("Conflict error");
        break;
      case 422:
        toast.error("Invalid data");
        break;
      case 500:
      default:
        toast.error("Server error");
        break;
    }

    return Promise.reject(error);
  }
);

export default instance;
