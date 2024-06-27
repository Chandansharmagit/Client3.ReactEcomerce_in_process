const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  payment_method:{
    type:String,
    
    default:'esewa'
  },
  amount:{
    type:Number,
    
  },
  status:{
    type:String,
  },

  items: [{
    itemId: { type: Number, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    img: { type: String }  // Assuming you want to store image URLs
  }],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
