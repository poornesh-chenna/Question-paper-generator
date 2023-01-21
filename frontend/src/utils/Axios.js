import axios from "axios";

const instance = axios.create({
  baseURL: process.env.backendUrl || "http://localhost:5000",
});

instance.interceptors.request.use((req) => {
  req.headers.authorization =
    "Bearer " + (localStorage.getItem("jwtKey") || "");
  return req;
});

export const Axios = instance;
