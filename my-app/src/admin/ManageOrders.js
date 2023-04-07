import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import useGetData from '../custom-hooks/useGetData'
import {toast} from 'react-toastify'
import moment from 'moment';

const ManageOrders = () => {

  const{data:ordersData, loading} = useGetData('orders')

  const deleteProduct = async(id) => {
    await deleteDoc(doc(db, 'orders', id))
    toast.success('Delete Successfully')
  }


  return (
    <section>
    <Container className='order-container'>
      <Row>
        <Col lg='12'>
        <table className='table'>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {
                  loading ? <h4 className='py-5 text-center fw-bold'>Loading</h4> :
                    (ordersData.map(item=>{
                      const createdAt = item.createdAt.toDate();
                      const formattedDate = moment(createdAt).format("DD/MM/YYYY");
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{formattedDate}</td>
                          <td>{item.name}</td>
                          <td>{item.totalQty}</td>
                          <td>${item.totalAmount}</td>
                          <td><button onClick={() => {deleteProduct(item.id)}} className='btn btn-danger'>Delete</button></td>
                        </tr>
                      )
                    }))
                  }                
              </tbody>
            </table>
        </Col>
      </Row>
    </Container>
    </section>
  )
}

export default ManageOrders