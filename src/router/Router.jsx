import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Shop/Menu";
import ModalSignup from "../Components/ModalSignup";
import Modal from "../Components/ModalLogin";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Main/>,
      children:[
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/menu',
            element:<Menu/>,
            
        },
        
      ]
    },
    {
      path:'/signup',
      element:<ModalSignup/>
  },

  ]);

  export default router;