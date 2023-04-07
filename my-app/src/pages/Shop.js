import React, {useState, useEffect} from 'react'

import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import '../styles/shop.css'
import ProductList from '../components/UI/ProductList'
import useGetData from '../custom-hooks/useGetData'

const Shop = () => {
  
  const{data: products} = useGetData('products')

  const[allProducts, setAllProducts] = useState([])
  const[productsData, setProductsData] = useState([])

  useEffect(() => {
    setAllProducts(products)
    setProductsData(products)
  }, [products])

  const handleFilter = e => {
    const filterValue = e.target.value
    if(filterValue==='Biossance'){
      const filteredProducts = allProducts.filter(item => item.category === 'Biossance')

      setProductsData(filteredProducts)
    }

    if(filterValue==='The Ordinary'){
      const filteredProducts = allProducts.filter(item => item.category === 'The Ordinary')

      setProductsData(filteredProducts)
    }

    if(filterValue==='New Collections'){
      const filteredProducts = allProducts.filter(item => item.category === 'New Collections')

      setProductsData(filteredProducts)
    }
  }

  const handleSearch = e => {
    const searchTerm = e.target.value

    const searchedProducts = allProducts.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))

    setProductsData(searchedProducts)
  }
  
  return <Helmet title='Shop'>
    <CommonSection title='Products'/>

    <section>
      <Container>
        <Row>
          <Col lg='3' md='6'>
            <div className='filter-widget'>
                <select onChange={handleFilter}>
                  <option>Filter by Category</option>
                  <option value='Biossance'>Biossance</option>
                  <option value='The Ordinary'>The Ordinary</option>
                  <option value='New Collections'>New Collections</option>
                </select>
            </div>
          </Col>

          <Col lg='9' md='12'>
            <div className='search-box'>
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
            {products && products.length > 0 ? (
              <ProductList data={productsData} />
            ) : (
              <h1 className='text-center fs-4'>No products are found!</h1>
            )}
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Shop