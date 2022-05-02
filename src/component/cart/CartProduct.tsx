import React, { MouseEvent } from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import "./cart.css";

interface Props {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  addOne?: (e: MouseEvent<HTMLElement>) => void;
  minusOne?: (e: MouseEvent<HTMLElement>) => void;
  buttonClassName: string;
}

export default function CartProduct(props: Props) {
  return (
    <Row>
      <Col>
        <Image src={props.image} className="cartItem-image" />
        <div>{props.name}</div>
        <div>HK${props.price}</div>
      </Col>
      <Col>
        <div>Quantity: {props.quantity}</div>
        <Button
          variant="outline-info"
          id={props.id}
          onClick={props.addOne}
          className={props.buttonClassName}
        >
          {" "}
          +{" "}
        </Button>
        <Button
          variant="outline-info"
          id={props.id}
          onClick={props.minusOne}
          className={props.buttonClassName}
        >
          {" "}
          -{" "}
        </Button>
      </Col>
      <Col>
        <div>Total Price: HK${props.totalPrice}</div>
      </Col>
    </Row>
  );
}
