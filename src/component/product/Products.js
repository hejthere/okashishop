import React, { useContext, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './product.css';
import Product from './Product';
import database from '../../data.json'
import { CartContext } from '../../CartContext'
import SearchBox from './SearchBox'


export default function Products() {

    const [cartItem, setCartItem] = useContext(CartContext)
    const [inputValue, setInputValue] = useState('')
    const [displayItemArray, setDisplayItemArray] = useState(database.arrayOfProducts)

    const addToCartHandler = (e) => {
        let addedItem = database.arrayOfProducts.find(item => item.id === e.target.id)
        let isExisted = cartItem.find(item => item.id === addedItem.id)
        if (!isExisted) {
            setCartItem(prevCart => [...cartItem, addedItem])
        }
        else {
            let itemIndex = cartItem.indexOf(addedItem)
            let updatedCart = [...cartItem]
            let updatedItem = { ...addedItem, quantity: addedItem.quantity + 1 }
            updatedCart[itemIndex] = updatedItem
            setCartItem(updatedCart)
        }
        alert('Added to Cart')
    }


    let machaItem = displayItemArray.map(item => {
        return (
            <Col className='py-3 px-0'>
                <Product
                    key={item.id}
                    id={item.id}
                    picture={item.imgUrl}
                    name={item.name}
                    price={item.price}
                    addToCartHandler={addToCartHandler} />
            </Col>)
    })



    const searchHandler = () => {
        const filteredItem = database.arrayOfProducts.filter(item => {
            return item.name === inputValue
        })
        setDisplayItemArray(filteredItem)
    }


    const inputValueHandler = (e) => {
        setInputValue(e.target.value)
    }



    return (
        <Container fluid='true' className='overflow-hidden'>
            <Row>
                <Col><h2 className='pt-3'> Feature Items: </h2></Col>
                <Col><SearchBox
                    inputValue={inputValue}
                    setInputValue={inputValueHandler}
                    searchHandler={searchHandler}
                    resetHandler={() => { setDisplayItemArray(database.arrayOfProducts) }} /></Col></Row>

            <Row className='m-0 px-1' xs sm={2} md lg xl={4}>
                {displayItemArray.length === 0 && <h5 className='my-3'>No result is found !</h5>}
                {machaItem}
            </Row>
        </Container>
    )
}