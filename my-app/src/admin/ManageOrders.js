import React, {useState} from 'react'
import { Container, Row, Col, Pagination, PaginationItem,PaginationLink } from 'reactstrap'
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import useGetData from '../custom-hooks/useGetData'
import {toast} from 'react-toastify'
import moment from 'moment';

const ManageOrders = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const{data:ordersData, loading} = useGetData('orders')

  const deleteProduct = async(id) => {
    await deleteDoc(doc(db, 'orders', id))
    toast.success('Delete Successfully')
  }

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const pageCount = Math.ceil(ordersData.length / pageSize);
  const pages = [...Array(pageCount).keys()];

  const startIndex = currentPage * pageSize;

  const selectedProducts = ordersData.slice(
    startIndex,
    startIndex + pageSize
  );


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
                    (selectedProducts.map(item=>{
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

            <Pagination aria-label="Product navigation" className='pagination justify-content-center mt-4'>
              <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink
                  onClick={(e) => handleClick(e, currentPage - 1)}
                  previous
                  href="#"
                />
              </PaginationItem>

              {pages.map((index) => (
                <PaginationItem active={currentPage === index} key={index}>
                  <PaginationLink onClick={(e) => handleClick(e, index)} href="#">
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem disabled={currentPage >= pageCount - 1}>
                <PaginationLink
                  onClick={(e) => handleClick(e, currentPage + 1)}
                  next
                  href="#"
                />
              </PaginationItem>
            </Pagination>
        </Col>
      </Row>
    </Container>
    </section>
  )
}

export default ManageOrders