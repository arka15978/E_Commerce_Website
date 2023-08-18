import React from 'react'
import { Container, Row, Col, Form, Button, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

const RegisterScreen = ()=>{
    const navigate = useNavigate()
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/'
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const emailHandler = (e)=>{
        setEmail(e.target.value)

    }
    const passwordHandler = (e)=>{
        setPassword(e.target.value)

    }
    const signupHandler = async(e)=>{
        e.preventDefault()

        try{
            
            const {data} = await axios.post('/users/signup',{
                email,
                password
            })
            console.log("B")
            localStorage.setItem('userInfo',JSON.stringify(data))
            navigate(redirect || '/')
            console.log("A")

        }
        catch(err){
            console.log(err)
            
        }
        


    }
    
    return (
        <div className="new-room">
          <div class="container">
    <div class="new-room-card">
      <div class="new-room-card-header">
          <h3>Login</h3>
      </div>
      <div class="new-room-form">

        <form class="form" action="" method="POST">
          <div class="new-room-form-group">
            <label for="room_name">Email ID</label>
            <input id="username" value = {email} type="email" onChange = {emailHandler}/>
          </div>
          <div class="new-room-form-group">
            <label for="password">Password</label>
            <input id="password" type="password" value = {password}
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" onChange = {passwordHandler} />
          </div>

          <button class="btn btn--main" onClick={signupHandler}>
            <i class="fa-solid fa-lock"></i>

            Register
          </button>
        </form>

        <div class="redirect-link">
          <p>Registered User?</p>
          <Link to = "/signin">Sign In</Link>
        </div>
      </div>
    </div>
  </div>

            
            
        </div>
    )
}
export default RegisterScreen