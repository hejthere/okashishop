import React, { useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { useAuth } from '../../firebaseAuth/AuthContext'
import CartProduct from '../cart/CartProduct';
import { CartContext } from '../../CartContext'



export default function CheckOut() {

    const [cartItem, setCartItem] = useContext(CartContext);
    const { updateCartHistory, currentUser } = useAuth()
    const nameRef = useRef()
    const addressRef = useRef()
    const history = useHistory()


    function sendConfirmation() {
        updateCartHistory(currentUser.uid, {
            name: nameRef.current.value,
            address: addressRef.current.value,
            cartItem: cartItem
        }, Date.now()).then(
            alert('Your order has been received!'),
            history.push('/history'),
            setCartItem([])
        ).catch(error => alert(error))

    }

    //Contact Form

    const contactFormElement = [
        {
            id: 'name',
            label: 'Name',
            type: 'input',
            ref: nameRef,
            placeholder: 'Enter Name'
        },
        {
            id: 'deliveryAddress',
            label: 'Delivery Address',
            type: 'input',
            ref: addressRef,
            placeholder: 'Enter Address'
        },
    ]

    const contactForm = contactFormElement.map(el => {
        return (
            <Form.Group key={el.id} >
                <Form.Label>{el.label}</Form.Label>
                <Form.Control required type={el.type} ref={el.ref} placeholder={el.placeholder} />
            </Form.Group>
        )
    })

    //Cart Item Summary

    const summaryCartList = cartItem.map(item => {
        return (
            <CartProduct
                buttonClassName='m-1 invisible'
                key={item.id}
                id={item.id}
                image={item.imgUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                totalPrice={item.quantity * item.price} />
        )
    })

    return (
        <Container fluid="true">
            <h2>Order Detail</h2>
            {contactForm}
            <hr />
            {summaryCartList}
            <hr />
            <h4 className='w-100 d-flex justify-content-end'>
                Total Price: HK$
            {cartItem.length < 2 ? cartItem[0].price : (cartItem.reduce((a, b) => {
                return (a.quantity * a.price) + (b.quantity * b.price)
            }))}
            </h4>
            <div className='w-100 d-flex justify-content-end my-3'>
                <Button variant='info' className='mx-1' onClick={sendConfirmation}>Confirm</Button>
                <Button variant='danger' className='mx-1' onClick={() => history.goBack()}>Back</Button>
            </div>
        </Container>
    )
}
