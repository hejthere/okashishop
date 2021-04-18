import React from 'react';
import { Image, Button } from 'react-bootstrap';

export default function Product(props) {
    return (
        <div className="product-container p-1">
            <Image className='product-image m-auto' src={props.picture} />
            <div className='d-flex justify-content-between'>
                <h4>{props.name}</h4><h4 className='product-price'>HK${props.price}</h4></div>
            <Button variant='info' id={props.id} onClick={props.addToCartHandler}>Add to Cart</Button>
        </div>
    )


}