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
        const res = axiosSecure.get(`http://localhost:3000/carts?email=${user?.email}`,{
          headers:{
            authorization:`Bearer ${token}`
          }
        });
        return res.json();
      } ,
    })
  
  
    return [cart , refetch]
}

export default useCart