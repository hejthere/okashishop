import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useAuth } from "../../firebaseAuth/AuthContext";
import CartProduct from "../cart/CartProduct";
import { database } from "../../firebaseAuth/firebase";
import { useHistory } from "react-router-dom";
import { Product } from "../../Modal";

export default function BuyHistory() {
  const [cartHistory, setCartHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  //@ts-ignore
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const userInfo = database.ref("user/" + currentUser.uid);
    userInfo.on("value", (item) => {
      const userCartItem = item.val();
      setCartHistory(userCartItem);
      setLoading(false);
    });
  }, [currentUser]);

  const cartHistoryArray = Object.keys(cartHistory || {}).map(
    //@ts-ignore
    (item) => cartHistory[item]
  );
  const cartHistoryList = cartHistoryArray.map((buyHistory) => {
    return (
      <Container className="m-5" key={buyHistory.date}>
        <div>{new Date(buyHistory.date).toUTCString()}</div>
        {buyHistory.cartItem.map((item: Product) => {
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
        })}
        <h4 className="w-100 d-flex justify-content-end">
          Total Price: HK$
          {buyHistory.cartItem.length < 2
            ? buyHistory.cartItem[0].price
            : //@ts-ignore
              buyHistory.cartItem.reduce((a, b) => {
                return a.quantity * a.price + b.quantity * b.price;
              })}
        </h4>
        <hr />
      </Container>
    );
  });

  return (
    <Container fluid={true}>
      <h1>Order History</h1>
      {!loading && cartHistoryList}
      <div className="w-100 mb-3 d-flex justify-content-end">
        <Button variant="info" onClick={() => history.push("/")}>
          Back
        </Button>
      </div>
    </Container>
  );
}
