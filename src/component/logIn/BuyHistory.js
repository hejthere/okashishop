import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useAuth } from '../../firebaseAuth/AuthContext'
import CartProduct from '../cart/CartProduct';
import { CartContext } from '../../CartContext'
import { database } from '../../firebaseAuth/firebase'


export default function BuyHistory() {
    const [cartItem] = useContext(CartContext);
    const [cartHistory, setCartHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth()

    useEffect(() => {
        const userInfo = database.ref('user/' + currentUser.uid);
        userInfo.on('value', (item) => {
            const userCartItem = item.val();
            setCartHistory(userCartItem)
            setLoading(false)
        })
    }, [currentUser])

    const cartHistoryArray = Object.keys(cartHistory || {}).map(item => cartHistory[item])
    const cartHistoryList = cartHistoryArray.map(buyHistory => {
        return (
            <Container className='m-5'>
                <div>{new Date(buyHistory.date).toUTCString()}</div>
                {buyHistory.cartItem.map(item => {
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
                })}
                <h4 className='w-100 d-flex justify-content-end'>
                    Total Price: HK$
                    {cartItem.length < 2 ? cartItem[0].price : (cartItem.reduce((a, b) => {
                    return (a.quantity * a.price) + (b.quantity * b.price)
                }))}
                </h4>
                <hr />
            </Container>
        )
    });

    return (
        <Container>
            <h1>Order History</h1>
            {!loading && cartHistoryList}
        </Container>


    )
}
