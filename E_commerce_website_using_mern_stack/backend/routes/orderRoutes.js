import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js'
import { isAuth, shippingPriceCalculator, totalPriceCalculator } from '../utils.js';

const orderRouter = express.Router()
orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      console.log("G",req.body)
      const itemsPrice = totalPriceCalculator(req.body.orderItems)
      const shippingPrice = 10
      const totalPrice = itemsPrice + shippingPrice
      const newOrder = new Order({
        name : req.body.name,
        orderItems: req.body.orderItems,
        address: req.body.address,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: parseInt(itemsPrice),
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
        user: req.user._id,
      });
  
      const order = await newOrder.save()
      res.status(201).send({ message: 'Your Order has been placed !', order_id : order._id })
    })
  )
  orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.find({ user: req.user._id });
      res.send(orders);
    })
  )
  orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      console.log("O",order)
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  )



export default orderRouter