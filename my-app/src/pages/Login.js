import React,{useState} from 'react'
import Helmet from '../components/Helmet/Helmet'
import {Container, Row, Col, Form, FormGroup} from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import { motion } from "framer-motion"
import '../styles/login.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.config'
import {toast} from 'react-toastify'
import { getDoc, doc } from 'firebase/firestore'
import {db} from '../firebase.config'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const[loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)

    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))
      const role = userDoc.data().role // Truy vấn giá trị trường role từ cơ sở dữ liệu

      console.log(user)
      setLoading(false)
      toast.success('Successfully logged in')
      if(role === "admin"){ // Kiểm tra nếu role là admin thì điều hướng đến trang admin
        navigate('/dashboard')
      }else{ // Nếu role là user thì điều hướng đến trang chính
        navigate('/')
      }
    } catch(error){
      setLoading(false)
      toast.error(error.message)
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      console.log(user)
      toast.success('Successfully logged in with Google')
      navigate('/home')
    }
      catch(error){
        toast.error(error.message)
      }
  }


  return ( <Helmet title='Login'>
        <section>
          <Container>
            <Row>
              {
                loading ? ( <Col lg='12' className='text-center'><h5 className='fw-bold'>Loading</h5></Col> ) : (
                  <Col lg='6' className='m-auto text-center'>
                <h3 className='fw-bold mb-4'>Login</h3>

                <Form className='auth-form' onSubmit={signIn}>
                  <FormGroup className='form-group'>
                    <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </FormGroup>

                  <FormGroup className='form-group'>
                    <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </FormGroup>

                  <motion.button whileTap={{scale:1.2}} type='submit' className='buy-btn auth-btn'>Login</motion.button>
                  <p>Don't have an account? <Link to='/signup'>Create an account</Link></p>
                  <div className='google-form'>
                  <span><i class="ri-google-fill"></i></span>
                  <motion.button 
                  whileTap={{scale:1.2}}
                  class="btn-google" 
                  type="button" 
                  onClick={signInWithGoogle}>
                  Sign in with Google</motion.button>
                  </div>
                </Form>
              </Col>
                )
              }
            </Row>
          </Container>
        </section>
  </Helmet>
  )
}

export default Login