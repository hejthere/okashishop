import React from 'react'
import '../../App.css'
import { Navbar, Nav } from 'react-bootstrap';


export default function NavBar(props) {


    return (
        <Navbar fixed='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href='/'>Okashii</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link eventKey={2} onClick={props.cartButton}>
                        Cart
               </Nav.Link>
                    <Nav.Link onClick={props.logOutHandler}>{props.logOutText}</Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}
