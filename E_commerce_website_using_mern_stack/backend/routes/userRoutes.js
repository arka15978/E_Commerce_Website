import express from 'express'
import bcrypt from 'bcryptjs'
import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import {createToken, emailResolver} from '../utils.js'

const userRouter = express.Router()

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ name: req.body.username });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: createToken(user),
          });
          return;
        }
      }
      res.status(401).send({ message: 'Invalid email or password' });
    })
  );
  

userRouter.post('/signup',expressAsyncHandler(async (req, res) => {
  console.log("R",req.body)
    
    const newUser = new User({
      name: emailResolver(req.body.email),
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    })
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: createToken(user),
    })
  }))

export default userRouter

