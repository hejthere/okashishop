import React from 'react'
import Button from 'react-bootstrap/Button'
import './product.css'

export default function SearchBox(props) {
    return (
        <div className='products-search-container' >
            <input type="text" value={props.inputValue} onChange={props.setInputValue} className="products-search" />
            <Button className="mx-1" onClick={props.searchHandler}>Search</Button>
            <Button className="mx-1" onClick={props.resetHandler}>Reset</Button></div >
    )
}
