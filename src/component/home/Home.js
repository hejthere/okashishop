import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import NavBar from './NavBar';
import Banner from './Banner';
import macha from '../../pictures/macha.jpg'
import Products from '../product/Products'
import Section from './Section'
import CartBox from '../cart/CartBox'
import { useAuth } from '../../firebaseAuth/AuthContext'
import { useHistory } from 'react-router-dom'


export default function Home() {
    const { currentUser, signOut } = useAuth()
    const history = useHistory()

    const checkOutHandler = () => {
        history.push('/checkout')
    }

    const logOutHandler = () => {
        if (currentUser) {
            signOut();
            alert('You are logged out.')
        } else {
            history.push('/login')
        }
    }

    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        console.log(currentUser)
    }, [])


    return (
        <Container fluid='true'>
            <NavBar logOutHandler={logOutHandler}
                logOutText={currentUser ? 'Log Out' : 'Log In'}
                cartButton={() => setShowCart(true)} />
            <Banner backgrounds={macha} />
            <Section />
            <Products />
            <CartBox checkOutHandler={checkOutHandler}
                show={showCart}
                onHide={() => setShowCart(false)} />
        </Container>
    )

};