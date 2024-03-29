import React, {useState ,useEffect} from 'react'
import '../styles/home.css'
import ProductList from '../components/UI/ProductList'
import Clock from '../components/UI/Clock'

import Helmet from '../components/Helmet/Helmet'
import {Container, Row,Col} from "reactstrap"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import counterImg from '../assets/images/product-10.png'
import routine from '../assets/images/routine.png'

import useGetData from '../custom-hooks/useGetData'

const Home = () => {

  const{data: products, loading} = useGetData('products')
  
  const[recommendProducts, setRecommendProducts] = useState()
  const[bestSalesProducts, setBestSalesProducts] = useState()
  const[newCollections, setNewCollections] = useState()

  const year = new Date().getFullYear()

  useEffect(() => {
    const filterRecommendProducts = products.filter(item => item.category === 'Biossance')
    const filterBestSalesProducts = products.filter(item => item.category === 'The Ordinary')
    const filterNewCollections = products.filter(item => item.category === 'New Collections')


    setRecommendProducts(filterRecommendProducts)
    setBestSalesProducts(filterBestSalesProducts)
    setNewCollections(filterNewCollections)
  },[products])
  
  return <Helmet title ={'Home'}>
    <section className='content-section'>
      <div className='content'>
        <p className='content-subtitle'>Trending Product in {year}</p>
        <h2>Make Your Interior More Minimalistics & Modern</h2>
        <p>Your skin is the largest organ of your body. It plays a crucial role in protecting your internal organs therefore making it an important organ that you have to maintain by all means.
              This requires a good understanding of good skincare products and their benefits as well as how negative products can harm your skin.</p>

        <motion.button whileTap={{scale:1.2}} className='buy-btn'><Link to='/shop'>EXPLORE</Link></motion.button>
      </div>
    </section>
    

    <section  className='routine-section'>
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className='routine-content'>
            <h4>How to use :</h4>
            <h6>01.</h6>
            <p>Clean Your Skin: Cleanser or Micellar Water</p>
            <h6>02.</h6>
            <p>Toner and Essence: Toner first, then Essence</p>
            <h6>03.</h6>
            <p>Serums and Actives: Alternate your Retinol and Vitamin C</p>
            <h6>04.</h6>
            <p>Eye Cream: Apply eye cream to reduce the appearance of fine lines and wrinkles</p>
            <h6>05.</h6>
            <p>Moisturize: Always make sure to moisturize your skin! Choose the best one for your skin type</p>
            </div>  
          </Col>

          <Col lg='6' md='6'>
            <div className='routine-img'>
              <img src={routine} alt='routine'></img>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <section className='recommend-products' >
    <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section-title'>Recommended</h2>
              <p className='section-recommend'>Complete your routine with </p>
            </Col>
            {
              loading ? (<h5 className='fw-bold'>Loading</h5>) : (<ProductList data={recommendProducts}/>)
            }
            
          </Row>
        </Container>
    </section>

    <section className='best-sales'>
      <Container>
      <Row>
            <Col lg='12' className='text-center'>
            <h2 className='section-title'>Best Sales</h2>
            </Col>
            {
              loading ? (<h5 className='fw-bold'>Loading</h5>) : (<ProductList data={bestSalesProducts}/>)
            }
          </Row>
      </Container>
    </section>

    <section className='timer-count'>
    <Container>
      <Row>
            <Col lg='6' md='12' className='count-down-col'>
              <div className='clock-top-content'>
                <h4 className='text-white fs-6 mb-2'>Limited Offers</h4>
                <h3 className='text-white fs-6 mb-3'>Speacial Product</h3>
              </div>
              <Clock/>

              <motion.button whileTap={{scale:1.2}} className='buy-btn store-btn'><Link to='/shop'>Visit Store</Link></motion.button>
            </Col>

            <Col lg='6' md='12' className='text-end counter-img'>
            <img src={counterImg} alt=''/>
            </Col>

          </Row>
      </Container>
    </section>

    <section className='collections'>
      <Container>
          <Row>
            <Col lg='12' className='text-center'>
                <h2 className='section-title'>New Collections</h2>
              </Col>
              {
                loading ? (<h5 className='fw-bold'>Loading</h5>) : (<ProductList data={newCollections}/>)
              }
          </Row>
      </Container>
    </section>
  </Helmet>

}

export default Home