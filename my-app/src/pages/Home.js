import React from 'react'
import '../styles/home.css'
import Services from '../services/Services'

import Helmet from '../components/Helmet/Helmet'
import brand from '../assets/images/brand.jpg'
import {Container, Row,Col} from "reactstrap"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
const Home = () => {
  
  const year = new Date().getFullYear()
  return <Helmet title ={'Home'}>
      <section className='hero__section'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
            <div className='hero__content'>
              <p className='hero__subtitle'>Trending Product in {year}</p>
            </div>
            <h2>Make Your Interior More Minimalistics & Modern</h2>
            <p>Your skin is the largest organ of your body. It plays a crucial role in protecting your internal organs therefore making it an important organ that you have to maintain by all means.
               This requires a good understanding of good skincare products and their benefits as well as how negative products can harm your skin.</p>

            <motion.button whileTap={{scale:1.2}} className='buy_btn'><Link to='/shop'>SHOP NOW</Link></motion.button>
            </Col>
            <Col lg='6' md='6'>
            <div className='hero__img'>
            <img src={brand} alt="brand"></img>
            </div>
            </Col>

          </Row>
        </Container>
    </section>
    <Services/>
  </Helmet>

}

export default Home