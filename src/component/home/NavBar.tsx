import React from "react";
import "../../App.css";
import { Navbar, Nav } from "react-bootstrap";

interface Props {
  cartButton: () => void;
  logOutHandler: () => void;
  orderHistoryButton: () => void;
  logOutText: string;
}

export default function NavBar(props: Props) {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="nav-bar"
    >
      <Navbar.Brand href="/">Okashi Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link eventKey={2} onClick={props.cartButton}>
            Cart
          </Nav.Link>
          <Nav.Link eventKey={2} onClick={props.orderHistoryButton}>
            Order History
          </Nav.Link>
          <Nav.Link onClick={props.logOutHandler}>{props.logOutText}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
