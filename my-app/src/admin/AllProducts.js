import React, {useState} from 'react'
import { Container, Row, Col,Table, Pagination, PaginationItem,PaginationLink } from 'reactstrap'
import useGetData from '../custom-hooks/useGetData'
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import {toast} from 'react-toastify'

const AllProducts = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const { data: productsData, loading } = useGetData('products');

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    toast.success('Delete Successfully');
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const pageCount = Math.ceil(productsData.length / pageSize);
  const pages = [...Array(pageCount).keys()];

  const startIndex = currentPage * pageSize;

  const selectedProducts = productsData.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <Table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  selectedProducts.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt="" />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => { deleteProduct(item.id)}}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>

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
  );
};

export default AllProducts