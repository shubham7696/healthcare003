import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('#############Starting Request#############', JSON.stringify(config, null, 2))
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // If token exists, add it to the request headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const resp = await refreshTokenRepository();
//         if (!resp) {
//           await logoutRepository();
//           window.location.href = "/login";
//         }
//         return axiosInstance(originalRequest);

//         // Retry the original request with the new token
//       } catch (error) {
//         console.log("Errrrororr", error);
//         await logoutRepository();
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
