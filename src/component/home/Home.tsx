import React, { useState } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import Banner from "./Banner";
import macha from "../../pictures/macha.jpg";
import Products from "../product/Products";
import Section from "./Section";
import CartBox from "../cart/CartBox";
import { useAuth } from "../../firebaseAuth/AuthContext";
import { useHistory } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";
import useWindowDimensions from "../../hook/dimension";

//images
import door from "../../pictures/door.jpg";
import ground from "../../pictures/footer.png";
import shockedCharacter from "../../pictures/shockobaachan.png";
import character from "../../pictures/obaachan.png";

export default function Home() {
  //@ts-ignore
  const { currentUser, signOut } = useAuth();
  const history = useHistory();
  const [showCart, setShowCart] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { height, width } = useWindowDimensions();

  const checkOutHandler = () => {
    if (!currentUser) return history.push("/login");
    history.push("/checkout");
  };

  const LoginAndOutHandler = () => {
    if (!currentUser) return history.push("/login");
    signOut();
    alert("You are logged out.");
  };

  return (
    <Container fluid={true} className="p-0">
      <div className="header-container">
        <NavBar
          logOutHandler={LoginAndOutHandler}
          logOutText={currentUser ? "Log Out" : "Log In"}
          cartButton={() => setShowCart(true)}
        />
        <Banner backgrounds={macha} />
      </div>
      <div className="scroll-effect-container p-0 m-0">
        <div className="roof" />
        <Row
          className="door-container  p-0 m-0"
          onClick={() => setIsClicked(true)}
        >
          <Image
            src={shockedCharacter}
            className="character shocked-character"
          />
          <Image
            src={character}
            className={isClicked ? "character disappeared" : "character"}
          />
          <Col className="door-col p-0">
            <Parallax
              className="door-parallax"
              easing="easeIn"
              translateX={[height > width ? 110 : 100, 50]}
            >
              <Image src={door} fluid className="door door-left" />
            </Parallax>
          </Col>
          <Col className="door-col p-0">
            <Parallax
              className="door-parallax"
              easing="easeIn"
              // startScroll={height > width ? -height : -height}
              translateX={[height > width ? -10 : 0, 50]}
            >
              <Image src={door} fluid className="door" />
            </Parallax>
          </Col>
        </Row>
        <Image src={ground} className="floor" />
      </div>
      <Section />
      <Products />
      <CartBox
        checkOutHandler={checkOutHandler}
        show={showCart}
        onHide={() => setShowCart(false)}
      />
    </Container>
  );
}
