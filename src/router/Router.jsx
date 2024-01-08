import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Shop/Menu";
import ModalSignup from "../Components/ModalSignup";
import Modal from "../Components/ModalLogin";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import Update_Profile from "../pages/Dashboard/Update-Profile";
  
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
            element: <PrivateRouter> <Menu/> </PrivateRouter> ,
            
        },
        {
          path:'/update-profile',
          element: <Update_Profile/>
        }
        
      ]
    },
    {
      path:'/signup',
      element:<ModalSignup/>
  },

  ]);

  export default router;