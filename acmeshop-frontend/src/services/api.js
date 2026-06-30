import axios from "axios";

// Common function to create API clients
function createApi(baseURL) {

  const api = axios.create({
    baseURL,
  });

  // Request Interceptor
  api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {

      config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

  });

  // Response Interceptor
  api.interceptors.response.use(

    (response) => response,

    (error) => {

      if (error.response?.status === 401) {

        localStorage.removeItem("token");

        alert("⚠️ Session Expired. Please login again.");

        window.location.href = "/login";

      }

      return Promise.reject(error);

    }

  );

  return api;

}

export const userApi = createApi(
  "http://localhost:3000/api/v1/users"
);

export const productApi = createApi(
  "http://localhost:3001/api/v1/products"
);

export const cartApi = createApi(
  "http://localhost:3002/api/v1/cart"
);

export const orderApi = createApi(
  "http://localhost:3003/api/v1/orders"
);