import React, {useEffect, useState} from 'react'
import {Container, Row, Col} from 'reactstrap'
import '../styles/dashboard.css'

import { db } from '../firebase.config'
import { collection, getDocs } from 'firebase/firestore'

import useGetData from '../custom-hooks/useGetData'
import { Chart } from "react-google-charts";

const Dashboard = () => {

  const{data: products} = useGetData('products')
  const{data: users} = useGetData('users')
  const{data: orders} = useGetData('orders')

  const [totalSales, setTotalSales] = useState(0);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const getTotalSales = async () => {
      const ordersRef = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersRef);
      const ordersData = ordersSnapshot.docs.map(doc => doc.data());
      const sales = ordersData.reduce((total, order) => total + order.totalAmount, 0);
      setTotalSales(sales);
      setOrdersData(ordersData);
    }

    getTotalSales();
  }, []);

  const salesByDay = [
    ["Day", "Sales"],
    ...ordersData.map((order) => {
      if (order.orderDate) {
        return [
          order.orderDate.toDate().toLocaleDateString("en-US"), // định dạng ngày tháng
          order.totalAmount,
        ];
      } else {
        return [null, order.totalAmount];
      }
    }),
  ];
  
  return (
    <section>
      <Container>
        <Row>
          <Col className='lg-3'>
            <div className='revenue-box'>
              <h5>Total Sales</h5>
              <span>${totalSales}</span>
            </div>
          </Col>
          <Col className='lg-3'>
          <div className='orders-box'>
              <h5>Total Orders</h5>
              <span>{orders.length}</span>
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
        <div className='chart-box'>
          <div className='chart-title'>
            <h5>Sales Chart <i class="ri-line-chart-line"></i></h5>
          </div>
          <Chart
              width={"100%"}
              height={300}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={salesByDay}
              options={{
                hAxis: {
                  title: "Day",
                  format: "dd MMM yyyy", // Hiển thị dưới dạng dd/MM/yyyy (VD: 02/04/2023)
                  textStyle: { color: "#333" },
                  titleTextStyle: { color: "#333" },
                },
                vAxis: {
                  title: "Sales",
                  textStyle: { color: "#333" },
                  titleTextStyle: { color: "#333" },
                },legendTextStyle: { color: "#333" },
                chartArea: { width: "80%", height: "70%", backgroundColor: "#f5f5f5" },
                backgroundColor: "#fff",
                series: {
                  0: { color: "#4285f4" },
                  1: { color: "#db4437" },
                },
              }}
              legendToggle
            />
        </div>
      </Container>
    </section>
  )
}

export default Dashboard