const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Book price is required'],
    min: [0, 'Price cannot be negative']
  },
  coverImage: {
    type: String,
    required: [true, 'Cover image URL is required']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  categoryName: {
    type: String,
    required: [true, 'Category name is required']
  },
  description: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  newArrival: {
    type: Boolean,
    default: false
  },
  isbn: {
    type: String,
    trim: true,
    unique: true
  },
  publisher: {
    type: String,
    trim: true
  },
  publicationDate: {
    type: Date
  },
  language: {
    type: String,
    default: 'English'
  },
  pages: {
    type: Number,
    min: 1
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
// Virtual for discounted price
bookSchema.virtual('discountedPrice').get(function () {
  if (!this.discount) return this.price;
  return this.price - this.price * this.discount / 100;
});
// Index for search functionality
bookSchema.index({
  title: 'text',
  author: 'text',
  description: 'text'
});
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;