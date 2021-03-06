import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  EventHandler,
} from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./product.css";
import ProductBox from "./ProductBox";
import { CartContext } from "../../CartContext";
import SearchBox from "./SearchBox";
import { CartInfo, Product } from "../../Modal";

export default function Products() {
  const { cartItem, setCartItem } = useContext(CartContext);
  const searchRef = useRef();
  const [selectValue, setSelectValue] = useState("");
  const [database, setDatabase] = useState<Product[]>([]);
  const [displayItemArray, setDisplayItemArray] = useState<Product[]>([]);

  const fetchDatabase = useCallback(async () => {
    const response = await fetch(
      "https://my-json-server.typicode.com/hejthere/picture/db"
    );
    const data = await response.json();
    setDatabase(data.arrayOfProducts || []);
  }, []);

  useEffect(() => {
    fetchDatabase();
  }, [fetchDatabase]);

  useEffect(() => {
    setDisplayItemArray(database);
  }, [database]);

  const addToCartHandler = (id: string) => {
    let addedItem = database.find((item) => item.id === id);
    let addedItemIndexInCart = (cartItem ?? []).findIndex(
      (item: Product) => item?.id === id
    );
    if (addedItem) {
      if (addedItemIndexInCart === -1) {
        setCartItem([...(cartItem || []), addedItem]);
      } else {
        let updatedCart = [...(cartItem || [])];
        updatedCart[addedItemIndexInCart] = {
          ...addedItem,
          quantity: addedItem.quantity + 1,
        };
        setCartItem(updatedCart);
      }
      alert("Added to Cart");
    }
  };

  let machaItem = displayItemArray.map((item: Product) => {
    return (
      <Col className="py-3 px-0" key={item.id}>
        <ProductBox
          id={item.id}
          imgUrl={item.imgUrl}
          name={item.name}
          price={item.price}
          addToCartHandler={(e) => addToCartHandler(e)}
          quantity={item.quantity}
        />
      </Col>
    );
  });

  //   const searchHandler = () => {
  //     const searchValue = searchRef.current.value;
  //     if ((searchValue.trim() !== "") | (searchValue.length !== 0)) {
  //       const filteredItem = database.filter((item) =>
  //         item.name.toUpperCase().includes(searchValue.toUpperCase())
  //       );
  //       setDisplayItemArray(filteredItem);
  //     } else {
  //       setDisplayItemArray(database);
  //     }
  //     searchRef.current.value = "";
  //   };

  //   const sortHandler = (e) => {
  //     setSelectValue(e.target.value);
  //     const newSortArray = [...database];
  //     if (selectValue === "fromHightToLow") {
  //       newSortArray.sort((a, b) => (a.price > b.price ? 1 : -1));
  //     } else {
  //       newSortArray.sort((a, b) => (a.price > b.price ? -1 : 1));
  //     }
  //     setDisplayItemArray(newSortArray);
  //   };

  //   const resetHandler = () => {
  //     setDisplayItemArray(database);
  //     searchRef.current.value = "";
  //   };

  return (
    <Container fluid={true} className="overflow-hidden">
      <Row xs={1} sm={1} md={2} lg={2} xl={2}>
        <Col>
          <h2 className="pt-3"> Feature Items: </h2>
        </Col>
        <Col>
          {/* <SearchBox
            forwardedRef={searchRef}
            searchHandler={searchHandler}
            resetHandler={resetHandler}
            sortHandlerHigh={() => sortHandler(true)}
            sortHandlerLow={() => sortHandler(false)}
            sortHandler={sortHandler}
            value={selectValue}
          /> */}
        </Col>
      </Row>

      <Row className="m-0 px-1" xs={2} sm={2} md={4} lg={4} xl={4}>
        {displayItemArray.length === 0 && (
          <h5 className="my-3">No result is found !</h5>
        )}
        {machaItem}
      </Row>
    </Container>
  );
}
