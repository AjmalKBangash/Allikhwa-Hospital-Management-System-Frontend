import axios from "axios";
import { useNavigate } from "react-router-dom";
// function axiosinstance() {
// Set Axios global defaults
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.timeout = 10000;

// // Set Authorization header based on access token in local storage
axios.defaults.headers.common["Authorization"] = `Bearer ${
  localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : null
}`;
// Create an instance of Axios with custom configurations
// const axios = axios.create({
//   baseURL: "http://localhost:8000/", // Common base URL for all requests
//   timeout: 5000, // Timeout for requests in milliseconds
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${
//       localStorage.getItem("access_token")
//         ? localStorage.getItem("access_token")
//         : null
//     }`,
//   },
// });
// }

// ///////////////// 1st
// // Request interceptor to add Authorization header for authenticated requestsClick
// axios.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("access_token");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     console.log("during requestttttttttttttttttttttttttttttttttttttttt");
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle token refresh and other response logic
// axios.interceptors.response.use(
//   (response) => {
//     // Handle successful responses
//     console.log("After requestttttttttttttttttttttttttttttttttttttttt");
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle token refresh logic if you are using JWT

//     if (
//       error.response.status === 401 &&
//       error.response.data.code === "token_not_valid" &&
//       !originalRequest._retry
//     ) {
//       try {
//         originalRequest._retry = true;
//         // Call your Django backend's refresh token endpoint
//         const response = await axios.post("api/token/refresh/", {
//           refresh: localStorage.getItem("refresh_token"),
//         });
//         // If the refresh is successful, update the access token
//         console.log(
//           "This is access Tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"
//         );
//         console.log(response.data.access);
//         // if (response.data.access) {
//         const newAccessToken = response.data.access;
//         localStorage.setItem("access_token", newAccessToken);
//         // Update the Authorization header in the original request
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         // Retry the original request with the new access token
//         return axios(originalRequest);
//         // } else {

//         // }
//       } catch (refreshError) {
//         // Handle refresh error, e.g., redirect to login
//         // localStorage.removeItem("access_token");
//         // localStorage.removeItem("refresh_token");
//         // localStorage.removeItem("employee_loggedin_persistentdata");
//         window.location("/signup");
//         console.error("Token refresh failed:", refreshError);
//         // Redirect to login or perform other actions
//         return Promise.reject(refreshError);
//       }
//     }

//     // Handle other error scenarios as needed
//     return Promise.reject(error);
//   }
// );
// // }
// export default axios;
// export default axiosinstance;

// /////////////////////////////////////////////////////////////////////////////////////////////////2nd
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // Set Axios global defaults
// axios.defaults.baseURL = "http://localhost:8000/";
// axios.defaults.timeout = 5000;

// // Set Authorization header based on access token in local storage
// axios.defaults.headers.common["Authorization"] = `Bearer ${
//   localStorage.getItem("access_token")
//     ? localStorage.getItem("access_token")
//     : null
// }`;

// // Track refresh token expiration state
// let isRefreshing = false;
// let refreshFailed = false;

// // Request interceptor to add Authorization header for authenticated requests
// axios.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("access_token");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle token refresh and other response logic
// axios.interceptors.response.use(
//   (response) => {
//     // Handle successful responses
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle token refresh logic if you are using JWT
//     if (
// error.response.status === 401 &&
// error.response.data.code === "token_not_valid" &&
// !originalRequest._retry
//     ) {
//       if (!isRefreshing) {
//         isRefreshing = true;

//         try {
//           // Call your Django backend's refresh token endpoint
//           const response = await axios.post("api/token/refresh/", {
//             refresh: localStorage.getItem("refresh_token"),
//           });
//           // If the refresh is successful, update the access token
//           const newAccessToken = response.data.access;
//           localStorage.setItem("access_token", newAccessToken);
//           // Update the Authorization header in the original request
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           // Retry the original request with the new access token
//           return axios(originalRequest);
//         } catch (refreshError) {
//           refreshFailed = true;
//           const navigate = useNavigate();
//           localStorage.setItem("access_token", "");
//           localStorage.setItem("refresh_token", "");
//           localStorage.setItem("employee_loggedin_persistentdata", "");
//           navigate("/signup");
//           // Handle refresh error, e.g., redirect to login
//           console.error("Token refresh failed:", refreshError);
//           // Redirect to login or perform other actions
//           return Promise.reject(refreshError);
//         } finally {
//           isRefreshing = false;
//         }
//       } else {
//         // If refresh is already in progress, block the request and handle it after refresh is complete
//         await new Promise((resolve) => {
//           const interval = setInterval(() => {
//             if (!isRefreshing) {
//               clearInterval(interval);
//               resolve();
//             }
//           }, 100);
//         });
//         if (!refreshFailed) {
//           return axios(originalRequest);
//         }
//       }
//     }

//     // Handle other error scenarios as needed
//     return Promise.reject(error);
//   }
// );

// export default axios;
//////////////////////////////////////////////////////////////////////////////////////////////////2nd completed
// return <></>;
// }
//
// export default axiosinstance;
// Set Axios globally to use the custom instance
// axios.defaults = axiosinstance.defaults;
// Object.assign(axios.defaults, axiosinstance.defaults);

////////////////////2nd
// axiosinstance.interceptors.request.use(
//   (config) => {
//     // const token = TokenService.getLocalAccessToken();
//     const token = localStorage.getItem("access_token")
//     if (token) {
//       config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
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
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;

//     if (originalConfig.url !== "/auth/signin" && err.response) {
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;

//         try {
//           const rs = await axiosinstance.post("/auth/refreshtoken", {
//             refreshToken: TokenService.getLocalRefreshToken(),
//           });

//           const { accessToken } = rs.data;
//           TokenService.updateLocalAccessToken(accessToken);

//           return instance(originalConfig);
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }
//     }

//     return Promise.reject(err);
//   }
// );

/////////////////////////////////////////////////////////////////////////////////////////////////////////4th START
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${
      localStorage.getItem("access_token")
        ? localStorage.getItem("access_token")
        : ""
    }`;
    // config.headers["Content-Type"] = 'Application/json'
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (
      error.response.status === 401 &&
      error.config.url === "api/token/refresh/"
    ) {
      window.location = "/signup";
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      error.response.data.code === "token_not_valid" &&
      !error.config._retry
    ) {
      console.log("Token is not valid. Attempting to refresh...");
      console.log(error.config.url);
      console.log(
        "errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
      );
      console.log(error);
      console.log("retryyyyyyyyyyyyyyyyyyyyyyyyyy");
      console.log(error.config._retry);
      // Modify the request to add a token refresh or reauthentication logic
      error.config._retry = true;
      return axios
        .post("api/token/refresh/", {
          /* your refresh token data */
          refresh: localStorage.getItem("refresh_token"),
        })
        .then((response) => {
          // If token refresh is successful, retry the original request
          if (response.data.access) {
            localStorage.setItem("access_token", response.data.access);
            error.config.headers.Authorization = `Bearer ${response.data.access}`;
            return axios(error.config);
          }
        });
      // .catch((refreshError) => {
      //   // Handle token refresh failure or other errors
      //   console.log(
      //     "error refreshing tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"
      //   );
      //   console.log("Error refreshing token:", refreshError);
      //   // Redirect to login page or perform other actions as needed
      //   // error.config._retry = false;    //THIS SHOULD BE IN FINALLY BLOCK BECAUSE THIS BLOCK RUN AGAIN AND AGAIN
      //   return Promise.reject(refreshError);
      // });
      // .finally(() => {
      //   // Ensure that _retry is reset regardless of success or failure
      //   error.config._retry = false;
      // });
    }

    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
/////////////////////////////////////////////////////////////////////////////////////////////////////////4th ENS
