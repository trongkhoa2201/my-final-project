import React,{useState} from 'react'
import { Container, Row, Col, Form, FormGroup} from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { useSelector } from 'react-redux'
import CheckoutWithPaypal from './CheckoutWithPaypal'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import { collection, addDoc } from 'firebase/firestore'

import '../styles/checkout.css'

const Checkout = () => {

  const totalQty = useSelector(state => state.cart.totalQuantity)
  const totalAmount = useSelector(state => state.cart.totalAmount)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')

  const handleOrder = async(e) => {
    const order = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      streetAddress: streetAddress,
      city: city,
      totalQty: totalQty,
      cartItems: cartItems,
      totalAmount: totalAmount,
      createdAt: new Date(),
    };
  
    try {
      const docRef = await addDoc(collection(db, "orders"),{
        cartItems,
        ...order,
      });
      toast.success("Order placed successfully!");
      console.log('Order placed with ID:', docRef.id);
      navigate("/order")
    } catch (error) {
      toast.error("Error placing order!");
      console.error('Error placing order:', error);
    }
  }

  const product = {
    description: 'Checkout',
    price: totalAmount,
  }

  return <Helmet title='Checkout'>
    <CommonSection title='Checkout'/>
    <section>
      <Container>
        <Row>
          <Col lg='8'>
            <h6 className='mb-4 fw-bold'>Billing Information</h6>
            <Form className='billing-form'>
              <FormGroup className='form-group'>
                <input type='text' placeholder='Enter your name' value={name} onChange = {(e) => setName(e.target.value)}/>
              </FormGroup>

              <FormGroup className='form-group'>
                <input type='email' placeholder='Enter your email' value={email} onChange = {(e) => setEmail(e.target.value)}/>
              </FormGroup>

              <FormGroup className='form-group'>
                <input type='number' placeholder='Phone number' value={phoneNumber} onChange = {(e) => setPhoneNumber(e.target.value)}/>
              </FormGroup>

              <FormGroup className='form-group'>
                <input type='text' placeholder='Street address' value={streetAddress} onChange = {(e) => setStreetAddress(e.target.value)}/>
              </FormGroup>

              <FormGroup className='form-group'>
                <input type='text' placeholder='City' value={city} onChange = {(e) => setCity(e.target.value)}/>
              </FormGroup>
              
            </Form>
          </Col>

          <Col lg='4'>
            <div className='checkout-cart'>
              <h6>Total Qty: <span>{totalQty} items</span></h6>
              <h6>Subtotal: <span>{totalAmount}</span></h6>
              <h6>
                <span>
                  Shipping: <br />
                  free Shipping
                </span>
                <span>$0</span>
              </h6>
              <h4>Total Cost: <span>${totalAmount}</span></h4>
              <motion.button whileTap={{scale:1.2}} className='buy-btn auth-btn w-100' onClick={handleOrder}>Place an order</motion.button>
              <hr></hr>
              <CheckoutWithPaypal product={product} />
            </div>               
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Checkout