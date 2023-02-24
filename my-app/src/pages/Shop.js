import React from 'react'

import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import '../styles/shop.css'

const Shop = () => {
  return <Helmet title='Shop'>
    <CommonSection title='Products'/>

    <section>
      <Container>
        <Row>
          <Col lg='3' md='4'>
            <div className='filter__widget'>
                <select>
                  <option>Filter by Category</option>
                  <option value='Biossance'>Biossance</option>
                  <option value='The Ordinary'>The Ordinary</option>
                  <option value='New Collections'>New Collections</option>
                </select>
            </div>
          </Col>
          <Col lg='3' md='3'>
          <div className='filter__widget'>
                <select>
                  <option>Sort by</option>
                  <option value='ascending'>Ascending</option>
                  <option value='descending'>Descending</option>
                </select>
            </div>
          </Col>
          <Col lg='6' md='6'>
            <div className='search__box'>
              <input type='text' placeholder='Search'></input>
              <span><i class="ri-search-line"></i></span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Shop