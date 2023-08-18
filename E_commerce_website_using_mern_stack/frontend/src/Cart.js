import { createContext, useState } from 'react'

export const Cart = createContext()
const initialState = {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
    ,
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : ''
}



export function CartProvider(props) {
    const[cart, setCart] = useState(initialState)
    const value = { cart, setCart };
    return <Cart.Provider value={value}>{props.children} </Cart.Provider>
  }