import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({data}) => {
  return (
    <>
    {data?.map((item, index)=>(
      <ProductItem item={item} key={index}/>
    ))
    }
    </>
  )
}

export default ProductList