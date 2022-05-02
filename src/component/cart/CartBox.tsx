import React, { useContext, useEffect, MouseEvent } from "react";
import { Modal, Button } from "react-bootstrap";
import { CartContext } from "../../CartContext";
import { Product } from "../../Modal";
import CartProduct from "./CartProduct";

interface Props {
  show: boolean;
  onHide: () => void;
  checkOutHandler: () => void;
}

export default function CartBox(props: Props) {
  //@ts-ignore
  const { cartItem, setCartItem } = useContext(CartContext);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem ?? ""));
  }, [cartItem]);

  // const quantityHandler = (e: MouseEvent<HTMLElement>, isAddedOne: boolean) => {
  //   const addedItem = cartItem?.find(
  //     (item: Product) => item.id === e.currentTarget.id
  //   );
  //   const itemIndex = cartItem?.indexOf(addedItem);
  //   let updatedCart = [...(cartItem ?? [])];
  //   if (!isAddedOne && addedItem.quantity === 1) {
  //     updatedCart.splice(itemIndex, 1);
  //   } else {
  //     updatedCart[itemIndex] = {
  //       ...addedItem,
  //       quantity: isAddedOne ? addedItem.quantity + 1 : addedItem.quantity - 1,
  //     };
  //   }
  //   setCartItem(updatedCart);
  // };

  const cartList = cartItem?.map((item: Product) => {
    return (
      <CartProduct
        buttonClassName="m-1 visible"
        key={item.id}
        id={item.id}
        image={item.imgUrl}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        // addOne={(e) => quantityHandler(e, true)}
        // minusOne={(e) => quantityHandler(e, false)}
        totalPrice={item.quantity * item.price}
      />
    );
  });

  return (
    <Modal
      animation={false}
      size="lg"
      show={props.show}
      onHide={props.onHide}
      dialogClassName="shopping-cart-box"
      aria-labelledby="shopping-cart"
    >
      <Modal.Header closeButton>
        <Modal.Title id="shopping-cart-title">Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!cartItem || cartItem.length === 0 ? (
          <div>Oops! Nothing is in the cart. </div>
        ) : (
          cartList
        )}
        <div className="w-100 d-flex justify-content-end">
          {cartItem && cartItem.length > 0 && (
            <Button onClick={props.checkOutHandler} variant="info">
              Check Out
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
