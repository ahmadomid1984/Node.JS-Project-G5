const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  name: {
    type: String,
    
  },
  summary: String,
  description: String,
  price: {
    type: Number,
    
  },
  releasedDate: {
    type: Date,
  
  },
  available_count: {
    type: Number,
  
  },
  updatedDate: {
    type: Date,
    
  },
  createDate: {
    type: Date,
    
  }
});

module.exports = mongoose.model("Product", productSchema);

