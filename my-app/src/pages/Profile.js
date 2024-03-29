import React, {useState, useEffect} from 'react'
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col} from 'reactstrap';
import '../styles/profile.css'
import { motion } from "framer-motion"

import { auth, storage } from '../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';  
import { toast } from 'react-toastify';  
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { updateProfile } from 'firebase/auth'

const Profile = () => {

    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null)
    const [photoURL, setPhotoURL] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
            setUser(user);
            setDisplayName(user.displayName);
            setEmail(user.email);
            setFile(null);
            setPhotoURL(user.photoURL || '')
        } else {
            setUser('');
            setDisplayName('');
            setEmail('');
            setFile('');
            setPhotoURL('');
        }
        });
    
        return unsubscribe;
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        
        try {
        const userDoc = doc(db, 'users', user.uid);
        const storageRef = ref(storage, `images/${Date.now() + displayName}`)
        const uploadPhoto = uploadBytesResumable(storageRef, file)
        const snapshot = await uploadPhoto;
        const downloadURL = await getDownloadURL(snapshot.ref);

        await updateDoc(userDoc, {
            displayName: displayName,
            photoURL: downloadURL,
            email: email,
        });
        await updateProfile(user,{
            displayName: displayName,
            photoURL: downloadURL,
            email: email,
        });
        setUser({ ...user, displayName: displayName, photoURL: downloadURL });
        toast.success('Profile updated successfully');
        } catch (error) {
        toast.error(error.message);
        }
    };
    
        const handleInputChange = (e) => {
        setDisplayName(e.target.value);
    };

return (
    <Helmet title='Profile'>
        <section className='profile-section'>
        <Container>
            <Row>
                <h3 className='mb-4 fw-bold'>Profile</h3>
                <Col lg='5' md='6'>
                    <div className='profile-image'>
                        <img src={photoURL} alt={user?.displayName} />
                        <div className='file-input'>
                        <input type='file' onChange={(e) => setFile(e.target.files[0])}/>
                        </div>
                    </div>
                </Col>
                <Col lg='7' md='12'>
                    <div className='profile-content'>
                        <form onSubmit={handleUpdateProfile} className='profile-form'>
                        <h6 class='profile-subtitle'>UserName :</h6>
                        <input
                        type="text"
                        placeholder="Enter your display name"
                        value={displayName}
                        onChange={handleInputChange}
                        className='profile-input'
                        />
                        <h6 class='profile-subtitle'>Email :</h6>
                        <input
                        type="text"
                        placeholder="Enter your display name"
                        value={email}
                        onChange={handleInputChange}
                        className='profile-input'
                        />
                        <motion.button whileTap={{scale:1.2}} type="submit" className='buy-btn'>Update</motion.button>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
        </section>
    </Helmet>
    )
}

export default Profile