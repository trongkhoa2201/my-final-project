import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row } from 'reactstrap'
import { motion } from 'framer-motion'
import {Link} from 'react-router-dom'
import '../styles/order.css'

const Order = () => {
  
  return <Helmet title='Order'>
    <section className='order-section'>
    <Container>
      <Row>
        <div className='order-form d-flex align-items-center justify-content-between'>
          <div className='order-success'>
            <i class="ri-checkbox-circle-line"></i>
            <h4 className='fs-4 fw-bold mt-1'>Hooray! Your Order Was Confirmed</h4>
            <p className='fs-6 mt-2'>Thanks you for your purchase</p>
            <motion.button whileTap={{scale:1.2}} className='buy-btn w-100  mt-5'><Link to='/shop'>Continue Shopping</Link></motion.button>
          </div>
        </div>
      </Row>
    </Container>
    </section>
  </Helmet>
}

export default Order