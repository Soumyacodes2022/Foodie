import axios from "axios"

const axiosPublic = axios.create({
    baseURL: "https://foodi-server-7z1l.onrender.com"
})
const useAxiosPublic = () => {
    return axiosPublic
}
export default useAxiosPublic