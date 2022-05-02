import React from "react";
import { Image, Button } from "react-bootstrap";
import { Product } from "../../Modal";

interface Props extends Product {
  addToCartHandler: () => void;
}

export default function ProductBox(props: Props) {
  return (
    <div className="product-container p-1">
      <Image className="product-image" src={props.imgUrl} />
      <div className="d-flex justify-content-between my-1">
        <h4>{props.name}</h4>
        <h4 className="product-price">HK${props.price}</h4>
      </div>
      <Button
        variant="info"
        id={props.id.toString()}
        onClick={props.addToCartHandler}
      >
        Add to Cart
      </Button>
    </div>
  );
}
