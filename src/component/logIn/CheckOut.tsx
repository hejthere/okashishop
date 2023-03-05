import React, { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { useAuth } from "../../firebaseAuth/AuthContext";
import CartProduct from "../cart/CartProduct";
import { CartContext } from "../../CartContext";
import { Product } from "../../Modal";
import { Controller, useForm } from "react-hook-form";

interface CheckoutFormDate {
  name: string;
  address: string;
}

export default function CheckOut() {
  const { cartItem, setCartItem } = useContext(CartContext);
  //@ts-ignore
  const { updateCartHistory, currentUser } = useAuth();
  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, control, watch } = useForm<CheckoutFormDate>();
  const history = useHistory();

  function sendConfirmation({ name, address }: CheckoutFormDate) {
    updateCartHistory(
      currentUser.uid,
      {
        name,
        address,
        cartItem: cartItem,
      },
      Date.now()
    )
      .then(
        alert("Your order has been received!"),
        history.push("/history"),
        setCartItem([])
      )
      .catch((error: any) => alert(error));
  }

  //Cart Item Summary
  const summaryCartList = cartItem?.map((item) => {
    return (
      <CartProduct
        buttonClassName="m-1 invisible"
        key={item.id}
        id={item.id}
        image={item.imgUrl}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        totalPrice={item.quantity * item.price}
      />
    );
  });

  return (
    <Container fluid={true}>
      <h2>Order Detail</h2>
      <Form>
        <div className="pb-4">
          <Controller
            control={control}
            name="name"
            rules={{ required: "Required" }}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <>
                <div>Name</div>
                <input
                  className="input-box"
                  ref={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                  required={true}
                  value={value}
                />
                {error && <div className="text-danger">{error.message}</div>}
              </>
            )}
          />
          <Controller
            control={control}
            name="address"
            rules={{ required: "Required" }}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <>
                <div className="pt-3">Delivery Address</div>
                <input
                  className="input-box"
                  ref={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  required={true}
                />
                {error && <div className="text-danger">{error.message}</div>}
              </>
            )}
          />
        </div>
      </Form>
      <hr />
      {summaryCartList}
      <hr />
      <h4 className="w-100 d-flex justify-content-end">
        Total Price: HK$
        <>
          {cartItem && cartItem?.length < 2
            ? cartItem?.[0].price * cartItem?.[0].quantity
            : //@ts-ignore
              cartItem?.reduce((a: Product, b: Product) => {
                return a.quantity * a.price + b.quantity * b.price;
              })}
        </>
      </h4>
      <div className="w-100 d-flex justify-content-end my-3">
        <Button
          variant="danger"
          className="mx-1"
          onClick={() => history.goBack()}
        >
          Back
        </Button>
        <Button
          variant="info"
          className="mx-1"
          onClick={handleSubmit(sendConfirmation)}
        >
          Confirm
        </Button>
      </div>
    </Container>
  );
}
