import React from 'react'
import './footer.css'

import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap'
import {Link} from 'react-router-dom'

const Footer = () => {

  const year = new Date().getFullYear()
  return <footer className='footer'>
    <Container>
      <Row>
        <Col lg='4' className='mb-4' md='6'>
          <div className='logo'>
              <div>
                <h1 className='text-white'>ROSANITY</h1>
              </div>
          </div>

          <p className='footer__text mt-4'> lorem</p>
        </Col>

        <Col lg='3' md='3' className='mb-4'>
          <div className='footer__quick-links'>
              <h4 className='quick__links-title'>Top Categories</h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Biossance</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>The Ordinary</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Best Sales</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>New Collections</Link>
                </ListGroupItem>
              </ListGroup>
          </div>
        </Col>

        <Col lg='2' md='3' className='mb-4'>
        <div className='footer__quick-links'>
              <h4 className='quick__links-title'>Useful Link</h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/shop'>Shop</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/cart'>Cart</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/login'>Login</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
          </div>
        </Col>

        <Col lg='3' md='4'>
          <div className='footer__quick-links'>
                <h4 className='quick__links-title'>Contact</h4>
                <ListGroup className='footer__contact'>
                  <ListGroupItem className='ps-0 border-0 d-flex align-item-center gap-2'>
                    <span><i class="ri-map-pin-line"></i></span>
                    <p>141/3 Tieu La, Thang Binh, Quang Nam</p>
                  </ListGroupItem>
                  <ListGroupItem className='ps-0 border-0 d-flex align-item-center gap-2'>
                    <span><i class="ri-phone-line"></i></span>
                    <p>+84975562265</p>
                  </ListGroupItem>
                  <ListGroupItem className='ps-0 border-0 d-flex align-item-center gap-2'>
                    <span><i class="ri-mail-line"></i></span>
                    <p>Khoantgbd191279@fpt.edu.vn</p>
                  </ListGroupItem>
                </ListGroup>
          </div>
        </Col>
        <Col lg='12'>
          <p className='footer__copyright'>Copyright {year} developed by Trong Khoa. All Rights reserved.</p>
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer