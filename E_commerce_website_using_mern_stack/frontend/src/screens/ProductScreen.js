import React from 'react'
import Navbar from '../components/NavBar.js'
import Header from '../components/Header.js'
import {useLocation, useParams, useNavigate} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Cart } from '../Cart'
import { Button } from 'react-bootstrap'
import { Container, Image, Row, Col, Form } from 'react-bootstrap'

const ProductScreen = ()=>{
    const navigate = useNavigate()
    const params = useParams()
    const { id: productId } = params
    console.log(productId)
    const[product, setProduct] = useState({})
    const{cart,setCart} = useContext(Cart)
    
    const [rating, setRating] = useState(0);

  const handleRatingChange = async(event) => {
    try{
    console.log("G",parseInt(event.target.value, 10))
    setRating(parseInt(event.target.value, 10))
    await axios.post(`/products/rating/${productId}`)
    

}
    catch(err){
        console.log("Failed")
    }

  };
    useEffect(()=>{
        const fetchProduct = async()=>{
            try{
            const {data} = await axios.get(`/products/${productId}`)
            console.log("P",data)
            setProduct(data)}
            catch(err){
                console.log(err)
            }
            
        }
        fetchProduct()


    },[])

    const addtoCardHandler = ()=>{
        if (!localStorage.getItem('userInfo')){
            navigate('/signin')
            return

        }
        const currentCartItems = cart.cartItems
        currentCartItems.push({...product,quantity : 1})
        localStorage.setItem('cartItems', JSON.stringify(currentCartItems))
        setCart({...cart, cartItems : currentCartItems})
    }
    const plusHandler = ()=>{
        const currentCartItems = cart.cartItems
        const itemIndex = currentCartItems.findIndex((x)=> x._id == product._id)
        currentCartItems[itemIndex] = {...currentCartItems[itemIndex], quantity : currentCartItems[itemIndex].quantity + 1}
        if(currentCartItems[itemIndex].quantity == product.numInStock){
            console.log("Out of Stock")
        }
        else{
        localStorage.setItem('cartItems', JSON.stringify(currentCartItems))
        setCart({...cart, cartItems : currentCartItems})}
    }
    const minusHandler = ()=>{
        const currentCartItems = cart.cartItems
        const itemIndex = currentCartItems.findIndex((x)=> x._id == product._id)
        if(currentCartItems[itemIndex].quantity == 1){
            currentCartItems.splice(itemIndex,1)
        }
        else{
        currentCartItems[itemIndex] = {...currentCartItems[itemIndex], quantity : currentCartItems[itemIndex].quantity -1}}
        localStorage.setItem('cartItems', JSON.stringify(currentCartItems))
        setCart({...cart, cartItems : currentCartItems})
    }
        
        

    
    
    return (
        <div>
            <Header/>
            <h1>{product.name}</h1>
            <Container className="mt-5">
      <Row>
        <Col md={6}>
          <img src='' alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <h2>Rate This Product</h2>
          <Form.Group>
            <Form.Label>Select a Rating:</Form.Label>
            <Form.Control
              as="select"
              value={rating}
              onChange={handleRatingChange}
              disabled = {rating != 0}
            >
              <option value={0}>Select...</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </Form.Control>
          </Form.Group>
          <p>Your rating: {rating} stars</p>
        </Col>
      </Row>
    </Container>
            {cart.cartItems && cart.cartItems.find((x)=>x._id == product._id)?(<div>
                <Button onClick = {plusHandler}>+</Button>
                <p>{cart.cartItems.find((x)=>x._id == product._id).quantity}</p>
                <Button onClick = {minusHandler}>-</Button>
            </div>):(
                <div><Button onClick = {addtoCardHandler}>Add to Cart</Button></div>
                
                )
            }

            
        </div>
    )
}
export default ProductScreen