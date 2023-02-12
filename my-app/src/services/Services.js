import React from 'react'
import {Container, Row,Col} from "reactstrap"
import { motion } from 'framer-motion'
import '../services/service.css'

const Services = () => {
  return <section className='service'>
  <Container>
    <Row>
      <Col lg='3' md='4'>
      <div className='service__item'>
        <span><i class="ri-truck-line"></i></span>
        <div>
            <h3>Free Shipping</h3>
            <p>Lorem</p>
        </div>
      </div>
      </Col>
    </Row>
  </Container>
</section>
}

export default Services