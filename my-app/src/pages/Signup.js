import React,{useState} from 'react'
import Helmet from '../components/Helmet/Helmet'
import {Container, Row, Col, Form, FormGroup} from 'reactstrap'
import {Link} from 'react-router-dom'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom'

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'

import { auth } from '../firebase.config'
import {storage} from '../firebase.config'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'


const Signup = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const signup = async(e) =>{
    e.preventDefault()
    setLoading(true)

    console.log("username:", username);
    console.log("file:", file);

    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user
      const storageRef = ref(storage, `images/${Date.now() + username}`)
      const uploadPhoto = uploadBytesResumable(storageRef, file)

      uploadPhoto.on((error) => {
        toast.error(error.message)
      }, () => {
        getDownloadURL(uploadPhoto.snapshot.ref).then(async(downloadURL) => {
           // update user profile
          await updateProfile(user,{
            displayName: username,
            photoURL: downloadURL,
          })
          // store user data in firebase database
          await setDoc(doc(db,'users', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL,
          })
        })
      })

     setLoading(false) 
     toast.success('Account created')
     navigate('/login')
     console.log(user)
    }catch(error){
      setLoading(false)
      toast.error('Something went wrong!!!')
    }
  }

  return <Helmet title='Signup'>
        <section>
          <Container>
            <Row>
              {loading ? ( 
                <Col lg='12' className='text-center'><h5 className='fw-bold'>Loading</h5></Col> 
                ) : (
                  <Col lg='6' className='m-auto text-center'>
                  <h3 className='fw-bold mb-4'>Sign Up</h3>

                  <Form className='auth-form'  onSubmit={signup}>
                  <FormGroup className='form-group'>
                      <input type='text' placeholder='Enter your username' value={username} onChange={e => setUsername(e.target.value)}/>
                    </FormGroup>

                    <FormGroup className='form-group'>
                      <input type='email' placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)}/>
                    </FormGroup>

                    <FormGroup className='form-group'>
                      <input type='password' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)}/>
                    </FormGroup>

                    <FormGroup>
                      <div className='file-input'>
                      <input type='file' onChange={e => setFile(e.target.files[0])}/>
                      </div>
                    </FormGroup>


                    <button type='submit' className='buy-btn auth-btn'>Sign Up</button>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                  </Form>
                </Col>
                )
              }
            </Row>
          </Container>
        </section>
  </Helmet>
}

export default Signup