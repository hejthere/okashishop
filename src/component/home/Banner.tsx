import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import "./home.css";

interface Props {
  backgrounds: string;
}

const Banner = (props: Props) => {
  return (
    <Container className="banner-container p-0" fluid>
      <div className="banner-text">ようこそ</div>
      <Image
        src={props.backgrounds}
        className="banner-image"
        alt="background"
      />
    </Container>
  );
};

export default Banner;
