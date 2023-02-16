import React, {useState ,useEffect} from 'react'
import '../styles/home.css'
import Services from '../services/Services'
import ProductList from '../components/UI/ProductList'
import products from '../assets/data/products'

import Helmet from '../components/Helmet/Helmet'
import brand from '../assets/images/brand.jpg'
import {Container, Row,Col} from "reactstrap"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import counterImg from '../assets/images/product-05.jpg'

const Home = () => {
  
  const[recommendProducts, setRecommendProducts] = useState()
  const[bestSalesProducts, setBestSalesProducts] = useState()
  const year = new Date().getFullYear()

  useEffect(() => {
    const filterRecommendProducts = products.filter(item => item.category === 'Biossance')
    const filterBestSalesProducts = products.filter(item => item.category === 'Best Sales')


    setRecommendProducts(filterRecommendProducts)
    setBestSalesProducts(filterBestSalesProducts)
  },[])
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
    <section className='recommend__products' >
    <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section__title'>Recommended</h2>
              <p className='section__recommend'>Complete your routine with </p>
            </Col>
            <ProductList data={recommendProducts}/>
          </Row>
        </Container>
    </section>

    <section className='best__sales'>
      <Container>
      <Row>
            <Col lg='12' className='text-center'>
            <h2 className='section__title'>Best Sales</h2>
            </Col>

            <ProductList data={bestSalesProducts}/>
          </Row>
      </Container>
    </section>

    <section className='timer_count'>
    <Container>
      <Row>
            <Col lg='6' md='6'></Col>

            <Col lg='6' md='6'>
            <img src={counterImg} alt=''/>
            </Col>

          </Row>
      </Container>
    </section>
  </Helmet>

}

export default Home