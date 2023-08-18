import React from 'react'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import {Card, Button} from 'react-bootstrap'
import {useContext} from 'react'
import { Cart } from '../Cart'
import {Link} from 'react-router-dom'


const CartScreen = ()=>{
    const{cart,setCart} = useContext(Cart)
    const plusHandler = (item)=>{
        const currentCartItems = cart.cartItems
        const itemIndex = currentCartItems.findIndex((x)=> x._id == item._id)
        currentCartItems[itemIndex] = {...currentCartItems[itemIndex], quantity : currentCartItems[itemIndex].quantity + 1}
        if(currentCartItems[itemIndex].quantity == item.numInStock){
            console.log("Out of Stock")
        }
        else{
        localStorage.setItem('cartItems', JSON.stringify(currentCartItems))
        setCart({...cart, cartItems : currentCartItems})}


    }
    const minusHandler = (item)=>{
        const currentCartItems = cart.cartItems
        const itemIndex = currentCartItems.findIndex((x)=> x._id == item._id)
        if(currentCartItems[itemIndex].quantity == 1){
            currentCartItems.splice(itemIndex,1)
        }
        else{
        currentCartItems[itemIndex] = {...currentCartItems[itemIndex], quantity : currentCartItems[itemIndex].quantity -1}}
        localStorage.setItem('cartItems', JSON.stringify(currentCartItems))
        setCart({...cart, cartItems : currentCartItems})


       
        

    }
    const removeHandler = (item)=>{
        const currentCartItems = cart.cartItems
        const itemIndex = currentCartItems.findIndex((x)=> x._id == item._id)
        currentCartItems.splice(itemIndex,1)
        localStorage.setItem('cartItems', JSON.stringify(currentCartItems))
        setCart({...cart, cartItems : currentCartItems})


        

    }

    return (
        <div>
            <Header/>
            <Card>
                {cart.cartItems.map((item)=>{
                    return(
                        <div>{item.name}
                        <Button onClick = {()=>plusHandler(item)}>+</Button>
                        {item.quantity}
                        <Button onClick = {()=>minusHandler(item)}>-</Button>
                        <Button onClick = {()=>removeHandler(item)}>Remove</Button>
                        </div>
                    )
                })}
                
                
            </Card>
            {cart.cartItems.length!=0?(
            <Link to = '/placeorder'><Button>Place Order</Button></Link>):
            (<div></div>)}



        </div>
    )
    
}
export default CartScreen