import React from 'react'
import {useContext} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SearchBar from './SearchBar.js'
import NavBar from './NavBar.js'
//import Logo from '../assets/E_commerce_website_logo.png'
import Button from 'react-bootstrap/Button'
import {useNavigate, useLocation, useParams, Link} from 'react-router-dom'
import { Navbar,Nav,NavDropdown } from 'react-bootstrap'
import {useState} from 'react'
import {Cart} from '../Cart'

const Header = ()=>{
    const navigate = useNavigate()
    const e = 2
    const{cart, setCart} = useContext(Cart)
    const redirectURL = useLocation()
    const signinHandler = ()=>{
        navigate(`/signin?redirect=${redirectURL.pathname}`)

    }
    const [show, setShow] = useState(false);
    const showDropdown = (e)=>{
    setShow(!show);
}
    const hideDropdown = e => {
    setShow(false);
}
    const cartHandler = ()=>{
        navigate('/cart')

    }
    const signOutHandler = ()=>{
        localStorage.removeItem('userInfo')
        localStorage.removeItem('cartItems')
        navigate('/')
        setCart({cartItems : [],
        shippingAddress : {},
        paymentMethod : ''
    })
        
    }
    return (
        <div className = 'header'>
            <Container>
                <Row>
                <Col xs = {2}>
                    <Link to = '/'>
                    <img src = "/assets/E_commerce_website_logo.png"/>
                    </Link>
                
                </Col>
                <Col xs = {6}>
                </Col>
                <Col xs = {2} className='m-3'>
                    
                {localStorage.getItem('userInfo') ? (
                <div>
                    <div class="dropdown">
                    <button class="dropbtn">
                        <i class="fa-solid fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
                        <a href="" class="dropdown-link" onClick = {cartHandler}>
                        <i class="fa-solid fa-cart-shopping" style = {{margin : '5px'}}></i>
                               View Cart</a>
                        <a href="" class="dropdown-link" onClick={signOutHandler}>
                            <i class="fa-solid fa-right-from-bracket" style = {{margin : '5px'}}></i>

                               Signout</a>
                    </div>
                </div>
                    
                </div>):(<Button onClick = {signinHandler}>Sign In</Button>)}
                </Col>
                <Col xs = {1}>
                <Link to = '/cart'><Button>Cart</Button></Link>
                </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Header