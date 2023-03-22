import React from 'react'
import { Container, Row } from 'reactstrap'

import useAuth from '../custom-hooks/useAuth'
import '../styles/admin.css'
import {NavLink} from 'react-router-dom'

const admin_nav = [
    {
        display:'Dashboard',
        path:'/dashboard'
    },
    {
        display:'All-Products',
        path:'/dashboard/all-products'
    },
    {
        display:'Orders',
        path:'/dashboard/orders'
    },
    {
        display:'Users',
        path:'/dashboard/users'
    },
    {
        display:'Add-Product',
        path:'/dashboard/Add-Product'
    },
]

const AdminNav = () => {

    const {currentUser} = useAuth()
    
    return (
        <>
            <header className='admin-header'>
                    <div className='admin-nav-top'>
                        <Container>
                            <div className='admin-nav-wrapper-top'>
                                <div className='logo'>
                                    <h2>ROSANITY</h2>
                                </div>

                                <div className='search-box'>
                                    <input type='text' placeholder='Search'/>
                                </div>
                                
                                <div className='admin-nav-top-right'>
                                    <span><i class="ri-notification-3-line"></i></span>
                                    <span><i class="ri-settings-4-line"></i></span>
                                    <img src={currentUser && currentUser.photoURL} alt=''/>
                                </div>
                            </div>
                        </Container>
                    </div>
            </header>

            <section className='admin-menu p-0'>
                <Container>
                    <Row>
                        <div className='admin-navigation'>
                            <ul className='admin-menu-list'>
                                {
                                    admin_nav.map((item, index) => (
                                        <li className='admin-menu-item' key={index}>
                                            <NavLink to={item.path} className={navClass => navClass.isActive ? 
                                            'active-admin-menu' : ''}>{item.display}</NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default AdminNav