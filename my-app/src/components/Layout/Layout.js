import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'
import AdminNav from '../../admin/AdminNav'
import { useLocation } from 'react-router-dom'
import {PayPalScriptProvider } from '@paypal/react-paypal-js'

const Layout = () => {

  const location = useLocation()

  return ( 
    <PayPalScriptProvider options={{"client-id" : process.env.REACT_APP_PAYPAL_CLIENT_ID}}>
    <>
    {
      location.pathname.startsWith('/dashboard') ? <AdminNav/> : <Header/>
    }
    
    <div>
          <Routers/>
    </div>
    <Footer/>
    </>
    </PayPalScriptProvider>
  )
}

export default Layout