import React from 'react'
import '../../App.css'
import { Navbar, Nav } from 'react-bootstrap';
import { useAuth } from '../../firebaseAuth/AuthContext'


export default function NavBar(props) {

    const { currentUser } = useAuth()

    return (
        <Navbar fixed='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Okashii</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link eventKey={2} onClick={props.cartButton}>
                        Cart
               </Nav.Link>
                    <Nav.Link href={currentUser ? "./" : "./login"}>{currentUser ? 'Log Out' : 'Log in'}</Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}
