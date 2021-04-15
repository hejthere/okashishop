import React from 'react'
import '../../App.css'
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';


export default function NavBar(props) {

    return (
        <Navbar fixed='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Okashii</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features">Latest Product</Nav.Link>
                    <Nav.Link href="#pricing">On Sale!</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#deets">Log in</Nav.Link>
                    <Nav.Link eventKey={2} onClick={props.cartButton}>
                        Cart
      </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}
