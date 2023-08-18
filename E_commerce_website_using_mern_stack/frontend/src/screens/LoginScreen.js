import React from 'react'
import { Container, Row, Col, Form, Button, Card} from 'react-bootstrap'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'

const LoginScreen = ()=>{
    const navigate = useNavigate()
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/'
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const usernameHandler = (e)=>{
        setUsername(e.target.value)

    }
    const passwordHandler = (e)=>{
        setPassword(e.target.value)

    }
    const signinHandler = async(e)=>{
        e.preventDefault()
        console.log("K")
        try {
            const { data } = await axios.post('users/signin', {
              username,
              password,
            })
            localStorage.setItem('userInfo',JSON.stringify(data))
            navigate(redirect || '/')
        }
catch(err){
    console.log(err)
}}
    
    return (
        <div className="new-room">
          <div class="container">
    <div class="new-room-card">
      <div class="new-room-card-header">
          <h3>Login</h3>
      </div>
      <div class="new-room-form">

        <form class="form">
          <div class="new-room-form-group">
            <label for="room_name">Username</label>
            <input id="username" type="text" onChange = {usernameHandler}/>
          </div>
          <div class="new-room-form-group">
            <label for="password">Password</label>
            <input id="password" type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" onChange = {passwordHandler} />
          </div>

          <button class="btn btn--main" onClick = {signinHandler}>
            <i class="fa-solid fa-lock"></i>

            Signin
          </button>
        </form>

        <div class="redirect-link">
          <p>Haven't registered yet?</p>
          <Link to = "/signup">Register</Link>
        </div>
      </div>
    </div>
  </div>
            
            
        </div>
    )
}
export default LoginScreen