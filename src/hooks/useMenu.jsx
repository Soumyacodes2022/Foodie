import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query';

const useMenu = () => {
    const axiosPublic = useAxiosPublic();
    const {refetch , data: menu = [], isPending: isMenuLoading } = useQuery({ 
        queryKey: ['menu' ],  
        queryFn: async()=>{
          const res = await axiosPublic.get(`/menu`);
          return res.data;
        } ,
      })
  return [menu,isMenuLoading,refetch];
}

export default useMenu
