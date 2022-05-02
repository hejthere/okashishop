import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./product.css";
import { Row, Col } from "react-bootstrap";

interface Props {
  value: string;
  forwardedRef: any;
  searchHandler: () => void;
  resetHandler: () => void;
  sortHandler: () => void;
}

export default function SearchBox(props: Props) {
  return (
    <div className="products-search-container">
      <Row>
        <Col>
          <input
            type="text"
            ref={props.forwardedRef}
            className="products-search"
          />
        </Col>
        <Button
          variant="outline-info"
          className="mx-1"
          onClick={props.searchHandler}
        >
          Search
        </Button>
        <Button
          variant="outline-info"
          className="mx-1"
          onClick={props.resetHandler}
        >
          Reset
        </Button>
        <Form>
          <Col>
            <Form.Control
              className="mx-1"
              as="select"
              value={props.value}
              custom
              onChange={props.sortHandler}
            >
              <option defaultValue="" disabled value="">
                Sort by Price
              </option>
              <option value="fromHightToLow">From High to Low</option>
              <option value="fromLowToHigh">From Low to High</option>
            </Form.Control>
          </Col>
        </Form>
      </Row>
    </div>
  );
}
