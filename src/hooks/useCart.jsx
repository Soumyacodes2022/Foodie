import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"

const useCart = () => {
    const {user} = useAuth();
    const token = localStorage.getItem('Access-Token');
    const {refetch ,data:cart = [] } = useQuery({ 
      queryKey: ['carts', user?.email], 
      queryFn: async()=>{
        const res = await fetch(`http://localhost:3000/carts?email=${user?.email}`,{
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