import React,{useRef} from 'react'
import { Container, Row } from 'reactstrap'
import {motion} from 'framer-motion'

import useAuth from '../custom-hooks/useAuth'
import '../styles/admin.css'
import {Link,NavLink,useNavigate} from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify'
import userIcon from '../assets/images/user-icon.png'

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
        display:'Manage Orders',
        path:'/dashboard/manage-orders'
    },
    {
        display:'Users',
        path:'/dashboard/users'
    },
    {
        display:'Add-Product',
        path:'/dashboard/add-Product'
    },
]

const AdminNav = () => {

    const {currentUser} = useAuth()
    const navigate = useNavigate()
    const profileActionRef = useRef(null)
    const headerRef = useRef(null)

    const menuRef = useRef(null)
    
    const logout = () => {
        signOut(auth).then(()=>{
        toast.success('Logged out')
        navigate('/home')
        }).catch(err=>{
        toast.error(err.message)
        })
    }

    const menuToggle = () => menuRef.current.classList.toggle('active__menu')

    const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions')

    return (
        <>
            <header className='admin-header' ref={headerRef}>
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
                                    <div className='profile'>
                                    <motion.img 
                                        whileTap={{ scale: 1.2 }} 
                                        src={ currentUser ? currentUser.photoURL : userIcon} 
                                        alt=''
                                        onClick={toggleProfileActions}/>

                                    <div className='profile__actions' 
                                            ref={profileActionRef} 
                                            onClick={toggleProfileActions}>
                                        {
                                        currentUser ? ( 
                                            <div>
                                            <Link to='/profile'>Profile</Link>
                                            <br></br>
                                            <span onClick={logout}>Logout</span>
                                            </div>) 
                                        : (
                                        <div className=' d-flex align-items-center justify-content-center flex-column'>
                                            <Link to='/signup'>Signup</Link>
                                            <Link to='/login'>Login</Link>
                                        </div>
                                        )
                                        }
                                    </div>
                                    </div>
                                </div>

                                {/* <div className='navigation' ref={menuRef} onClick={menuToggle}>
                                <ul className='menu'>
                                {
                                    admin_nav.map((item , index) =>(<li className='nav__item' key={index}>
                                    <NavLink to={item.path} className={(navClass)=> navClass.isActive ? 'nav__active' : ''}>{item.display}</NavLink>
                                </li>))
                                }
                                </ul>
                                </div> */}
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