const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{
    itemId: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
  }],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Userproducts = mongoose.model("Userproducts", userSchema);

module.exports = Userproducts;

