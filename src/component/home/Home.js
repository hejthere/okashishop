import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import NavBar from './NavBar';
import Banner from './Banner';
import macha from '../../pictures/macha.jpg'
import Products from '../product/Products'
import Section from './Section'
import CartBox from '../cart/CartBox'
import { FirebaseDatabaseProvider } from "@react-firebase/database";

export default function Home() {
    const [showCart, setShowCart] = useState(false);

    return (
        <Container fluid='true'>
            <NavBar cartButton={() => setShowCart(true)} />
            <Banner backgrounds={macha} />
            <Section />
            <Products />
            <CartBox show={showCart} onHide={() => setShowCart(false)} />
        </Container>
    )

};