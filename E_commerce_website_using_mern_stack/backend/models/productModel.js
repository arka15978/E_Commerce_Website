import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
      images: [String],
      category: { type: String, required: true },
      brand: { type: String, required: true },
      description: { type: String, required: true },
      base_price: { type: Number, required: true },
      numInStock: { type: Number, required: true },
      processor : {type : String, required : false},
      driver : {type : String, required : false},
      Noise_Cancellation : {type : String, required : false},
      Connectivity_Technology : {type : String, required : false},
      Form_Factor : {type : String, required : false},
      Screen_size: {type : String, required : false},
      video_resolution : {type : String, required : false},
      RAM : {type : String, required : false},
      Storage : {type : String, required : false},
      Battery : {type : String, required : false},
      display : {type : String, required : false},
      Operating_System : {type : String, required : false},
      avg_rating: { type: Number, required: true },
      numRatings: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
  );
  
  const Product = mongoose.model('Product', productSchema);
  export default Product