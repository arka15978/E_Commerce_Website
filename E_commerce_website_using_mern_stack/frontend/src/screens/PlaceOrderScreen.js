import React from 'react'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import { useContext, useState } from 'react'
import { Cart } from '../Cart'
import { Form, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select'



const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  const { cart, setCart } = useContext(Cart)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(localStorage.getItem('paymentMethod')?(JSON.parse(localStorage.getItem('paymentMethod'))):(''));
  const [address, setAddress] = useState(localStorage.getItem('shippingAddress')?(JSON.parse(localStorage.getItem('shippingAddress'))):(''))
  const [name, setName] = useState(localStorage.getItem('name')?(JSON.parse(localStorage.getItem('name'))):(''))

  const handlePaymentMethodChange = (e) => {
    localStorage.setItem('paymentMethod', JSON.stringify(e.value))
    setSelectedPaymentMethod(e.value)
  }
  const addressHandler = (e) => {
    localStorage.setItem('shippingAddress', JSON.stringify(e.target.value))
    setAddress(e.target.value)
  }
  const nameHandler = (e) => {
    localStorage.setItem('name', JSON.stringify(e.target.value))
    setName(e.target.value)

  }
  const nextHandler = async (e) => {
    e.preventDefault()
    const orderItems = cart.cartItems.map(({ _id, name, base_price, quantity, ...rest }) => ({ _id, name, base_price, quantity }))
    console.log(orderItems)
    const { data } = await axios.post('/orders', {
      name: JSON.parse(localStorage.getItem('name')),
      orderItems: orderItems,
      address: JSON.parse(localStorage.getItem('shippingAddress')),
      paymentMethod: JSON.parse(localStorage.getItem('paymentMethod'))
    },
      {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      }

    )
    const order_id = data.order_id
    navigate(`/order-payment/${order_id}`)


    return


  }
  return (
    <div class="new-room">
      <div class="container">
        <div class="new-room-card">
          <div class="new-room-card-header">
          </div>
          <div class="new-room-form">
            <form class="form">
              <div class="new-room-form-group">
                <label>Enter your name</label>
                <input required type="text" value={name} onChange={nameHandler} />
              </div>
              <div class="new-room-form-group">
                <label>Enter the Shipping Address</label>
                <textarea required type="text" value={address} onChange={addressHandler} />
              </div>

              <div class="new-room-form-group">
                <div className='catdrpdn'>
                  Search Products by Category
                  <Select options={[{ value: 'Cash on Delivery', label: 'Cash on Delivery' },
                  { value: 'Internet Banking', label: 'Internet Banking' }
                  ]} placeholder="Select category" onChange={handlePaymentMethodChange} />
                </div>

              </div>
              <div class="new-room-form-action">
                <button class="btn btn--main" onClick={nextHandler}>Next</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderScreen

