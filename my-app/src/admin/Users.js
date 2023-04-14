import React, {useState} from 'react'
import {Container, Row,Col, Pagination, PaginationItem,PaginationLink} from "reactstrap"
import useGetData from '../custom-hooks/useGetData'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'

const Users = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5;

    const{data:usersData, loading} = useGetData('users')

    const deleteUser = async(id) =>{
        await deleteDoc(doc(db, 'users', id))
        toast.success('User Deleted!')
    }

    const handleClick = (e, index) => {
        e.preventDefault();
        setCurrentPage(index);
    };
    
    const pageCount = Math.ceil(usersData.length / pageSize);
    const pages = [...Array(pageCount).keys()];
    
    const startIndex = currentPage * pageSize;
    
    const selectedProducts = usersData.slice(
        startIndex,
        startIndex + pageSize
    );

  return (
    <section>
        <Container>
            <Row>
                <Col lg='12'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                loading ? <h5 className='pt-5 fw-bold'>Loading</h5> : selectedProducts?.map(user =>(
                                    <tr key={user.uid}>
                                        <td><img src={user.photoURL} alt=''/></td>
                                        <td>{user.displayName}</td>
                                        <td>{user.email}</td>
                                        <td><button onClick={() => {deleteUser(user.uid)}} className='btn btn-danger'>Delete</button></td>
                                    </tr>
                                ))
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

export default Users