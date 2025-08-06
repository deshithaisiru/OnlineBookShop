const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity cannot be less than 1'],
    default: 1
  }
});
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});
// Calculate total price before saving
cartSchema.pre('save', async function (next) {
  let total = 0;
  if (this.items.length > 0) {
    const Book = mongoose.model('Book');
    for (const item of this.items) {
      const book = await Book.findById(item.book);
      if (book) {
        const price = book.discount ? book.price - book.price * book.discount / 100 : book.price;
        total += price * item.quantity;
      }
    }
  }
  this.totalPrice = total;
  next();
});
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;