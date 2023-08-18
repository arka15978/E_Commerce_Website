import React from 'react'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import {Card, Button} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Swal from 'sweetalert2'
import {useContext} from 'react'
import { Cart } from '../Cart'

const OrderSummaryScreen = ()=>{
    const{cart,setCart} = useContext(Cart)
    const params = useParams()
    const order_id = params.id
    const[orderDetails, setOrderDetails] = useState({})
    const[items,setItems] = useState([])
    const[shipPrice,setShipPrice] = useState(0)
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchOrder = async()=>{
            const {data} = await axios.get(`/orders/${order_id}`,
            {
              headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
              },
            })
            console.log("D",data)
            setItems(data.orderItems)
            setShipPrice(data.shippingPrice)
        }
        fetchOrder()
},[])
const prcHandler = ()=>{
  localStorage.setItem('cartItems',[])
  setCart([])
    Swal.fire({  
        title: 'Success!',  
        text: 'Your Order has been placed',
        icon: 'success'
      })
      navigate('/')


}
var price = 0

    
    return(
        <div>
            <h2>Order Summary</h2>
            <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
       {items.map((item,index)=>{
        price += item.base_price*item.quantity

        return (
            <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.base_price*item.quantity}</td>
            </tr>
        )
       })}
       <tr>
       <td colSpan={3} style = {{textAlign : 'center'}}>Total Price</td>
       <td>{price}</td>
       </tr>
       <tr>
       <td colSpan={3} style = {{textAlign : 'center'}}>Shipping Price</td>
       <td>{shipPrice}</td>
       </tr>
       <tr>
       <td colSpan={3} style = {{textAlign : 'center'}}>Grand Total</td>
       <td>{price + shipPrice}</td>
       </tr>
      </tbody>
    </Table>
    <Button onClick = {prcHandler}>Proceed to Checkout</Button>
            
        </div>
    )
}

export default OrderSummaryScreen