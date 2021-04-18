import React from 'react';
import { Button, Row, Col, Image } from 'react-bootstrap'
import './cart.css'

export default function CartProduct(props) {
    return (
        <Row>
            <Col><Image src={props.image} className="cartItem-image" />
                <div>{props.name}</div>
                <div>HK${props.price}</div></Col>
            <Col>
                <div>Quantity: {props.quantity}</div>
                <Button variant='outline-info' id={props.id} onClick={props.addOne} className='m-1'> + </Button>
                <Button variant='outline-info' id={props.id} onClick={props.minusOne} className='m-1'> - </Button></Col>
            <Col>
                <div>Total Price: HK${props.totalPrice}</div></Col>

        </Row>
    )
}
