import React, { useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { CartContext } from '../../CartContext'
import CartProduct from './CartProduct'

export default function CartBox(props) {
    const [cartItem, setCartItem] = useContext(CartContext);

    const quantityHandler = (e, isAdded) => {
        const addedItem = cartItem.find(item => item.id === e.target.id)
        const itemIndex = cartItem.indexOf(addedItem)
        let updatedCart = [...cartItem]
        if (!isAdded && addedItem.quantity === 1) { updatedCart.splice(itemIndex, 1) } else {
            const itemIndex = cartItem.indexOf(addedItem)
            let updatedItem = { ...addedItem, quantity: isAdded ? addedItem.quantity + 1 : addedItem.quantity - 1 }
            updatedCart[itemIndex] = updatedItem
        }
        setCartItem(updatedCart)
    }


    const cartList = cartItem.map(item => {
        return (
            <CartProduct
                key={item.id}
                id={item.id}
                image={item.imgUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                addOne={(e) => quantityHandler(e, true)}
                minusOne={(e) => quantityHandler(e, false)}
                totalPrice={item.quantity * item.price} />

        )
    })

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            dialogClassName="shopping-cart-box"
            aria-labelledby="shopping-cart"
        >
            <Modal.Header closeButton>
                <Modal.Title id="shopping-cart-title">
                    Shopping Cart
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {cartItem.length === 0 && <div>Oops! Nothing is in the cart. </div>}
                {cartList}
                <div className="w-100 d-flex justify-content-end">
                    <Button>Check Out</Button></div>
            </Modal.Body>
        </Modal>
    )
}