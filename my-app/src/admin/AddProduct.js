import React, {useState} from 'react'
import {Form, FormGroup, Container, Row, Col} from 'reactstrap'
import {toast} from 'react-toastify'

import { db, storage } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {

    const [enterTitle, setEnterTitle] = useState('')
    const [enterShortDesc, setEnterShortDesc] = useState('')
    const [enterDescription, setEnterDescription] = useState('')
    const [enterCategory, setEnterCategory] = useState('')
    const [enterPrice, setEnterPrice] = useState('')
    const [enterProductImg, setEnterProductImg] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const addProduct = async(e) =>{
        e.preventDefault()
        setLoading(true)

        try{

            const docRef = await collection(db, 'products')
            const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`) 
            const uploadPhoto = uploadBytesResumable(storageRef, enterProductImg)

            uploadPhoto.on(() => {
                toast.error('images not uploaded!!!')
            }, ()=>{
                getDownloadURL(uploadPhoto.snapshot.ref).then(async (downloadURL) => {
                    await addDoc(docRef, {
                        productName: enterTitle,
                        shortDesc: enterShortDesc,
                        description: enterDescription,
                        category: enterCategory,
                        price: enterPrice,
                        imgUrl: downloadURL,
                    } )
                })
            })
            setLoading(false)
            toast.success('product successfully added')
            navigate('/dashboard/all-products')
        }catch (err){
            setLoading(false)
            toast.error('product not added')
        }

    }

  return <section>
    <Container>
        <Row>
            <Col lg='12'>
                {
                    loading ? <h4 className='py-5'>Loading</h4> : <>
                    <Form onSubmit={addProduct}>
                        <FormGroup className='form-group'>
                            <span>Product title</span>
                            <input type='text' placeholder='asdasdas' value={enterTitle} onChange = {e => setEnterTitle(e.target.value)} required/>
                        </FormGroup>
                        <FormGroup className='form-group'>
                            <span>Short Description</span>
                            <input type='text' placeholder='asdas...' value={enterShortDesc} onChange = {e => setEnterShortDesc(e.target.value)} required/>
                        </FormGroup>
                        <FormGroup className='form-group'>
                            <span>Description</span>
                            <input type='text' placeholder='Description' value={enterDescription} onChange = {e => setEnterDescription(e.target.value)} required/>
                        </FormGroup>

                        <div className='d-flex align-items-center justify-conter-between gap-5'>
                        <FormGroup className='form-group'>
                            <span>Price</span>
                            <input type='number' placeholder='$100' value={enterPrice} onChange = {e => setEnterPrice(e.target.value)} required/>
                        </FormGroup>
                        <FormGroup className='form-group w-50'>
                            <span>Category</span>
                            <select className='w-100 p-2' value={enterCategory} onChange = {e => setEnterCategory(e.target.value)}>
                                <option>Select category</option>
                                <option value='Biossance'>Biossance</option>
                                <option value='The Ordinary'>The Ordinary</option>
                                <option value='New Collections'>New Collections</option>
                            </select>
                        </FormGroup>
                        </div>

                        <div>
                        <FormGroup className='form-group'>
                            <span>Product Image</span>
                            <input type='file' onChange={e => setEnterProductImg(e.target.files[0])} required/>
                        </FormGroup>
                        </div>
                        <button className='buy-btn btn' type='submit'>Add Product</button>
                    </Form>
                    </>
                }
            </Col>
        </Row>
    </Container>
  </section>
}

export default AddProduct