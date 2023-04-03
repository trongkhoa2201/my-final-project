import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import '../styles/dashboard.css'

import useGetData from '../custom-hooks/useGetData'
import { Chart } from "react-google-charts";

const Dashboard = () => {

  const{data: products} = useGetData('products')
  const{data: users} = useGetData('users')

  const data = [
    ["City", "2010 Population", "2000 Population"],
    ["New York City, NY", 8175000, 8008000],
    ["Los Angeles, CA", 3792000, 3694000],
    ["Chicago, IL", 2695000, 2896000],
    ["Houston, TX", 2099000, 1953000],
    ["Philadelphia, PA", 1526000, 1517000],
  ];
  
  const options = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "City",
    },
  };
  
  return (
    <section>
      <Container>
        <Row>
          <Col className='lg-3'>
            <div className='revenue-box'>
              <h5>Total Sales</h5>
              <span>$7890</span>
            </div>
          </Col>
          <Col className='lg-3'>
          <div className='orders-box'>
              <h5>Total Orders</h5>
              <span>$789</span>
            </div>
          </Col>
          <Col className='lg-3'>
          <div className='products-box'>
              <h5>Total Products</h5>
              <span>{products.length}</span>
            </div>
          </Col>
          <Col className='lg-3'>
          <div className='users-box'>
              <h5>Total Users</h5>
              <span>{users.length}</span>
            </div>
          </Col>
        </Row>
      </Container>

      <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
    </section>
  )
}

export default Dashboard