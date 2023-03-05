import React from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import "./cart.css";

interface Props {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  addOne?: (id: string) => void;
  minusOne?: (id: string) => void;
  buttonClassName: string;
}

export default function CartProduct({
  id,
  image,
  name,
  price,
  quantity,
  totalPrice,
  addOne,
  minusOne,
  buttonClassName,
}: Props) {
  return (
    <Row>
      <Col>
        <Image src={image} className="cartItem-image" />
        <div>{name}</div>
        <div>HK${price}</div>
      </Col>
      <Col>
        <div>Quantity: {quantity}</div>
        <Button
          variant="outline-info"
          id={id}
          onClick={() => {
            minusOne && minusOne(id);
          }}
          className={buttonClassName}
        >
          {" "}
          -{" "}
        </Button>
        <Button
          variant="outline-info"
          id={id}
          onClick={() => {
            addOne && addOne(id);
          }}
          className={buttonClassName}
        >
          {" "}
          +{" "}
        </Button>
      </Col>
      <Col>
        <div>Total Price: HK${totalPrice}</div>
      </Col>
    </Row>
  );
}
