import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.js'
import ResultsScreen from './screens/ResultsScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
import './App.css'
import CartScreen from './screens/CartScreen.js'
import PlaceOrderScreen from './screens/PlaceOrderScreen.js'
import OrderSummaryScreen from './screens/OrderSummaryScreen.js';

function App() {
  return (
    <Router>
    <div className="App">

      
      
      <Routes>
        <Route path="/" element = {<HomeScreen/>} />
        <Route path="/results" element = {<ResultsScreen/>} />
        <Route path="/product/:id" element = {<ProductScreen/>} />
        <Route path = "/signin" element = {<LoginScreen/>}/>
        <Route path = "/signup" element = {<RegisterScreen/>}/>
        <Route path = "/cart" element = {<CartScreen/>}/>
        <Route path = "/placeorder" element = {<PlaceOrderScreen/>}/>
        <Route path = "/order-payment/:id" element = {<OrderSummaryScreen/>}/>
        
      </Routes>
    
      
    </div>
    </Router>
  );
}

export default App;
