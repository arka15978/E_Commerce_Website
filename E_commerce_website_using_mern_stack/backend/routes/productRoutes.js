import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const productRouter = express.Router()
productRouter.get('/', async (req, res) => {
    const products = await Product.find()
    products.sort((a, b) => b.avg_rating - a.avg_rating)
    res.send(products)
  })
productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category')
    res.send(categories)
  })
  )
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: 'Product Not Found' })
  }
  })
productRouter.post('/rating/:id',async(req,res)=>{
  try{
  var product = await Product.findById(req.params.id)
  const total = (product.avg_rating)*(product.numRatings)
  product.avg_rating = (product.numRatings + 1)*(product.avg_rating)
  product.numRatings += 1
  product = await product.save()
  res.send("Success")}
  catch(err){
    res.status(500).json({ error: err.message })

  }


})





export default productRouter
