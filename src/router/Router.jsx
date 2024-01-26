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
import Login from "../Components/Login";
import AddMenu from "../pages/Dashboard/admin/AddMenu";
import ManageMenuItems from "../pages/Dashboard/admin/ManageMenuItems";
import UpdateMenuItem from "../pages/Dashboard/admin/UpdateMenuItem";
  
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
      path:'/login',
      element:<Login/>
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
        },
        {
          path:'add-menu',
          element:<AddMenu/>
        },
        {
          path:'manage-items',
          element:<ManageMenuItems/>
        },
        {
          path:'update-item/:id',
          element:<UpdateMenuItem/>,
          loader:({params})=>fetch(`http://localhost:3000/menu/${params.id}`)
        },
      ]
    }

  ]);

  export default router;