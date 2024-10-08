import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
    const {user} = useAuth();
    const token = localStorage.getItem('Access-Token');
    const axiosSecure = useAxiosSecure();
    const {refetch ,data:cart = [] } = useQuery({ 
      queryKey: ['carts', user?.email], 
      queryFn: async()=>{
        const res = await axiosSecure.get(`/carts?email=${user?.email}`,{
          headers:{
            authorization:`Bearer ${token}`
          }
        });
        return res.data;
      } ,
    })
  
  
    return [cart , refetch]
}

export default useCart