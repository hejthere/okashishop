import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './product.css'


export default function SearchBox(props) {

    return (
        <div className='products-search-container' >
            <input type="text" ref={props.forwardedRef} className="products-search" />
            <Button variant='outline-info' className="mx-1" onClick={props.searchHandler}>Search</Button>
            <Button variant='outline-info' className="mx-1" onClick={props.resetHandler}>Reset</Button>
            <Form>
                <Form.Control className="mx-1" as="select" value={props.value} custom onChange={props.sortHandler}>
                    <option defaultValue disabled value=''>Sort by Price</option>
                    <option value='fromHightToLow'>From High to Low</option>
                    <option value='fromLowToHigh'>From Low to High</option>
                </Form.Control>
            </Form>
        </div >
    )
}
