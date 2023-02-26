import React, {useState} from 'react'

import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import '../styles/shop.css'
import products from '../assets/data/products'
import ProductList from '../components/UI/ProductList'

const Shop = () => {
  
  const [productsData, setProductsData] = useState(products)

  const handleFilter = e => {
    const filterValue = e.target.value
    if(filterValue==='Biossance'){
      const filteredProducts = products.filter(item => item.category === 'Biossance')

      setProductsData(filteredProducts)
    }

    if(filterValue==='The Ordinary'){
      const filteredProducts = products.filter(item => item.category === 'The Ordinary')

      setProductsData(filteredProducts)
    }

    if(filterValue==='New Collections'){
      const filteredProducts = products.filter(item => item.category === 'New Collections')

      setProductsData(filteredProducts)
    }
  }

  const handleSearch = e => {
    const searchTerm = e.target.value

    const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))

    setProductsData(searchedProducts)
  }
  
  return <Helmet title='Shop'>
    <CommonSection title='Products'/>

    <section>
      <Container>
        <Row>
          <Col lg='3' md='4'>
            <div className='filter__widget'>
                <select onChange={handleFilter}>
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
              <input type='text' placeholder='Search' onChange={handleSearch}></input>
              <span><i class="ri-search-line"></i></span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <section className='pt-0'>
      <Container>
        <Row>
          {
            productsData.length === 0? <h1 className='text-center fs-4'>No products are found!</h1> : <ProductList data={productsData}/>
          }
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Shop