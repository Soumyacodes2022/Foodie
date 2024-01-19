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
import CartPage from "../pages/Shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/admin/Dashboard";
import Users from "../pages/Dashboard/admin/Users";
  
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
        },
        {
          path:'/cart-items',
          element:<PrivateRouter><CartPage/></PrivateRouter>
        }
        
      ]
    },
    {
      path:'/signup',
      element:<ModalSignup/>
    },
    {
      path:'/dashboard',
      element:<PrivateRouter><DashboardLayout/></PrivateRouter>,
      children: [
        {
          path: '',
          element:<Dashboard/>
        },
        {
          path:'users',
          element:<Users/>
        }
      ]
    }

  ]);

  export default router;