import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL:"https://foodi-server-7z1l.onrender.com"
})


const useAxiosSecure = () => {

const {logOut} = useAuth();
const navigate = useNavigate();

// Add a request interceptor
axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem("Access-Token");
    config.headers.authorization = `Bearer ${token}`
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


  // Add a response interceptor
axiosSecure.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    const status = error.response.status;
    if(status === 401 || status === 403){
        await logOut();
    }
    return Promise.reject(error);
  });

  return axiosSecure;
}

export default useAxiosSecure
