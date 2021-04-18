import React, { createContext, useState } from 'react'

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const localStorageItem = JSON.parse(localStorage.getItem('cartItem')) || []
    const [cartItem, setCartItem] = useState(localStorageItem)

    return (
        <CartContext.Provider value={[cartItem, setCartItem]}>
            {children}
        </CartContext.Provider>
    )
}
