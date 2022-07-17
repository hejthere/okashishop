import React from "react";
import { Image, Button } from "react-bootstrap";
import { Product } from "../../Modal";

interface Props extends Product {
  addToCartHandler: (id: string) => void;
}

export default function ProductBox({
  imgUrl,
  name,
  price,
  id,
  addToCartHandler,
}: Props) {
  return (
    <div className="product-container p-1">
      <Image className="product-image" src={imgUrl} />
      <div className="d-flex justify-content-between my-1">
        <h4>{name}</h4>
        <h4 className="product-price">HK${price}</h4>
      </div>
      <Button
        variant="info"
        id={id.toString()}
        onClick={() => addToCartHandler(id)}
      >
        Add to Cart
      </Button>
    </div>
  );
}
