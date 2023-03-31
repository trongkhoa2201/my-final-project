import { Routes , Route, Navigate} from 'react-router-dom'

import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import ProductDetails from '../pages/ProductDetails'
import Shop from '../pages/Shop'
import Signup from '../pages/Signup'
import ProtectRoute from './ProtectRoute'
import AddProduct from '../admin/AddProduct'
import AllProducts from '../admin/AllProducts'
import Dashboard from '../admin/Dashboard'
import Users from '../admin/Users'
import Profile from '../pages/Profile'
import Orders from '../admin/Orders'
import {PayPalScriptProvider } from '@paypal/react-paypal-js'



const Routers = () => {
  return  <PayPalScriptProvider options={{"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID}}>
  <Routes>
    <Route path='/' element={<Navigate to={'home'}/>} />
    <Route path='home' element={<Home/>} />
    <Route path='shop/:id' element={<ProductDetails/>} />
    <Route path='shop' element={<Shop/>}/>
    <Route path='cart' element={<Cart/>} />
    <Route path='/*' element={<ProtectRoute/>}>
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='dashboard/all-products' element={<AllProducts/>}/>
      <Route path='dashboard/add-product' element={<AddProduct/>}/>
      <Route path='dashboard/users' element={<Users/>}/>
      <Route path='dashboard/orders' element={<Orders/>}/>
    </Route>
    <Route path='checkout' element={<Checkout/>}/>
    <Route path='login' element={<Login/>} />
    <Route path='signup' element={<Signup/>} />
    <Route path='profile' element={<Profile/>}/>
  </Routes>
  </PayPalScriptProvider> 
};

export default Routers